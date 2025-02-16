'use server';

import { createServerSideClient } from '@/lib/supabase';

// 서버에서만 작동되는 모듈임을 명시

// GuestBook List 가져오기
export const getGuestBookList = async () => {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from('GuestBook')
    .select('*')
    .eq('deleted_YN', false) // `.is()` → `.eq()`로 변경
    .order('id', { ascending: false });

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
