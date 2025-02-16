import { useCallback, useEffect, useState } from 'react';
import { getGuestBookById, getGuestBookList } from '@/actions/guestbook.actions';
import { Database } from '@/types/supabase';

export type GuestBookDto = Database['public']['Tables']['GuestBook']['Row'];

const useGuestBookController = () => {
  const [loading, setLoading] = useState(false);
  const [guestBookList, setGuestBookList] = useState<GuestBookDto[]>([]);
  const [selectedGuestBook, setSelectedGuestBook] = useState<GuestBookDto | null>(null);

  // 🔹 전체 방명록 리스트 조회
  const onGetGuestBookList = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getGuestBookList();
      if (result) {
        setGuestBookList(result);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    onGetGuestBookList();
  }, [onGetGuestBookList]);

  // 🔹 단건 방명록 조회
  const onGetGuestBookById = useCallback(async (id: number) => {
    try {
      setLoading(true);
      const result = await getGuestBookById(id);
      if (result) {
        setSelectedGuestBook(result);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    guestBookList, // 전체 리스트
    selectedGuestBook, // 단건 데이터
    onGetGuestBookById, // 특정 ID 조회 함수
  };
};

export default useGuestBookController;
