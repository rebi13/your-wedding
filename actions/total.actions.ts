'use server';

import { createServerSideClient } from '@/lib/supabase';

// total data 가져오기
export const getTotalData = async () => {
  const supabase = await createServerSideClient();

  const { data, error } = await supabase.from('Total').select('*').eq('id', 1).maybeSingle(); // ✅ 데이터가 없을 경우 null 반환

  if (error) {
    console.error('Error fetching total entry:', error);
    return null;
  }

  // @ts-expect-error - Supabase 타입 추론 버그, 런타임에서는 정상 작동
  return data?.data;
};
