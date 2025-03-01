'use server';

import { createServerSideClient } from '@/lib/supabase';

// GuestBook List 가져오기
export const getImages = async () => {
  const supabase = await createServerSideClient();
  const { data } = await supabase.storage.from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!).list();

  return data;
};
