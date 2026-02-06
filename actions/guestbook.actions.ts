'use server';

import { createServerSideClient } from '@/lib/supabase';
import { Database } from '@/types/supabase';
import { compareHashPassword, hashPassword } from '@/utils/password';

// 서버에서만 작동되는 모듈임을 명시

// ✅ 입력값 검증 상수
const VALIDATION = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  CONTENT_MIN_LENGTH: 1,
  CONTENT_MAX_LENGTH: 1000,
  PASSWORD_MIN_LENGTH: 4,
  PASSWORD_MAX_LENGTH: 100,
} as const;

// ✅ 입력값 검증 함수
const validateGuestBookInput = (name: string, content: string, password: string) => {
  if (!name || name.length < VALIDATION.NAME_MIN_LENGTH) {
    throw new Error(`이름은 최소 ${VALIDATION.NAME_MIN_LENGTH}자 이상이어야 합니다.`);
  }
  if (name.length > VALIDATION.NAME_MAX_LENGTH) {
    throw new Error(`이름은 최대 ${VALIDATION.NAME_MAX_LENGTH}자까지 가능합니다.`);
  }
  if (!content || content.length < VALIDATION.CONTENT_MIN_LENGTH) {
    throw new Error('내용을 입력해 주세요.');
  }
  if (content.length > VALIDATION.CONTENT_MAX_LENGTH) {
    throw new Error(`내용은 최대 ${VALIDATION.CONTENT_MAX_LENGTH}자까지 가능합니다.`);
  }
  if (!password || password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    throw new Error(`비밀번호는 최소 ${VALIDATION.PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`);
  }
  if (password.length > VALIDATION.PASSWORD_MAX_LENGTH) {
    throw new Error(`비밀번호는 최대 ${VALIDATION.PASSWORD_MAX_LENGTH}자까지 가능합니다.`);
  }
};

// GuestBook List 가져오기
export const getGuestBookList = async ({ pageParam = 0 }) => {
  const limit = 3; // 한 번에 가져올 데이터 개수
  const offset = pageParam * limit; // 페이지네이션을 위한 offset

  const supabase = await createServerSideClient();

  // ✅ 전체 개수 가져오기
  const { data, error, count } = await supabase
    .from('GuestBook')
    .select('*', { head: false, count: 'exact' }) // ✅ 전체 개수 계산
    .eq('deleted_YN', false)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    throw error;
  }

  const totalRecords = count ?? 0; // ✅ count가 null이면 0으로 대체
  const fetchedDataLength = data.length; // 현재 가져온 데이터 개수
  const isLastPage = offset + fetchedDataLength >= totalRecords; // ✅ 마지막 페이지 여부 확인

  return {
    data,
    nextPage: !isLastPage ? pageParam + 1 : undefined, // ✅ 마지막 페이지라면 nextPage 없음
    isLastPage, // ✅ 마지막 페이지 여부 반환
  };
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
  // ✅ 서버 측 입력값 검증
  validateGuestBookInput(name, content, password);

  const supabase = await createServerSideClient();
  const result = await supabase
    .from('GuestBook')
    // @ts-expect-error - Supabase 타입 추론 버그, 런타임에서는 정상 작동
    .insert({
      name: name.trim(),
      content: content.trim(),
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
  // @ts-expect-error - Supabase 타입 추론 버그, 런타임에서는 정상 작동
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
  // ✅ 서버 측 입력값 검증
  validateGuestBookInput(name, content, password);

  if (!id || id <= 0) {
    throw new Error('유효하지 않은 방명록 ID입니다.');
  }

  const supabase = await createServerSideClient();

  const result = await supabase
    .from('GuestBook')
    // @ts-expect-error - Supabase 타입 추론 버그, 런타임에서는 정상 작동
    .update({
      name: name.trim(),
      content: content.trim(),
      password: await hashPassword(password),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('*')
    .single();

  return result.data;
};

// GuestBook Soft 삭제
export const deleteGuestBookSoft = async (id: number) => {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from('GuestBook')
    // @ts-expect-error - Supabase 타입 추론 버그, 런타임에서는 정상 작동
    .update({
      deleted_YN: true,
    })
    .eq('id', id)
    .select();

  return result.data;
};
