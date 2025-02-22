'use server';

import { createServerSideClient } from '@/lib/supabase';
import { Database } from '@/types/supabase';
import { compareHashPassword, hashPassword } from '@/utils/password';

// 서버에서만 작동되는 모듈임을 명시

// GuestBook List 가져오기
export const getGuestBookList = async () => {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from('GuestBook')
    .select('*', { head: false }) // ✅ 캐싱 문제 해결
    .eq('deleted_YN', false)
    .order('created_at', { ascending: false });

  return result.data;
};

// GuestBook 가져오기 + by Id
export const getGuestBookById = async (id: number) => {
  const supabase = await createServerSideClient();

  const { data, error } = await supabase
    .from('GuestBook')
    .select('*')
    .eq('id', id)
    .is('deleted_YN', false)
    .maybeSingle(); // ✅ 데이터가 없을 경우 null 반환

  if (error) {
    console.error('Error fetching guestbook entry:', error);
    return null;
  }

  return data;
};

export type GuestBookInsertDto = Database['public']['Tables']['GuestBook']['Insert'];

// GuestBook 작성하기
export const createGuestBook = async ({ name, content, password }: GuestBookInsertDto) => {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from('GuestBook')
    .insert({
      name,
      content,
      password: await hashPassword(password),
    })
    .select();

  return result.data;
};

// GuestBook 비밀번호 검증
export const checkGuestBookPassword = async (id: number, password: string) => {
  const supabase = await createServerSideClient();

  // 1. 저장된 해시된 비밀번호 조회
  const { data, error } = await supabase.from('GuestBook').select('password').eq('id', id).single(); // 단일 레코드 조회

  if (error || !data) {
    return false; // ID가 없거나 오류 발생 시
  }

  // 2. 해시된 비밀번호와 입력된 비밀번호 비교
  const isMatch = await compareHashPassword({ password, hashedPassword: data.password });

  return isMatch;
};

// GuestBook 수정하기
export const updateGuestBook = async (
  id: number,
  name: string,
  content: string,
  password: string
) => {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from('GuestBook')
    .update({
      name,
      content,
      password: await hashPassword(password),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select();

  return result.data;
};

// GuestBook Soft 삭제
export const deleteGuestBookSoft = async (id: number) => {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from('GuestBook')
    .update({
      deleted_YN: true,
    })
    .eq('id', id)
    .select();

  return result.data;
};
