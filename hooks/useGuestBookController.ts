import { useCallback, useEffect, useState } from 'react';
import {
  createGuestBook,
  getGuestBookById,
  getGuestBookList,
  GuestBookInsertDto,
} from '@/actions/guestbook.actions';
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
        setGuestBookList([...result]); // ✅ 새로운 배열 할당하여 상태 변경 강제 적용
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log('🟡 useEffect 실행됨: 방명록 리스트 다시 가져오기');
    onGetGuestBookList();
  }, [onGetGuestBookList]); // ✅ 의존성 배열 추가

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

  const onCreateGuestBook = async ({ name, content, password }: GuestBookInsertDto) => {
    try {
      setLoading(true);
      console.log('📌 방명록 작성 요청:', { name, content, password });

      const result = await createGuestBook({ name, content, password });

      console.log('✅ 방명록 작성 완료:', result);

      console.log('🔄 방명록 리스트 다시 가져오기');
      await onGetGuestBookList(); // ✅ setTimeout 제거 후 즉시 실행
    } catch (error) {
      console.error('방명록 작성 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    guestBookList, // 전체 리스트
    selectedGuestBook, // 단건 데이터
    onGetGuestBookById, // 특정 ID 조회 함수
    onCreateGuestBook, // 방명록 작성
  };
};

export default useGuestBookController;
