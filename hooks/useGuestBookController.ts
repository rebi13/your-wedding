import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createGuestBook, getGuestBookById, getGuestBookList } from '@/actions/guestbook.actions';
import { Database } from '@/types/supabase';

export type GuestBookDto = Database['public']['Tables']['GuestBook']['Row'];

const useGuestBookController = () => {
  const queryClient = useQueryClient();

  // ✅ 전체 방명록 리스트 조회 (자동 캐싱)
  const { data: guestBookList, isLoading: isGuestBookListLoading } = useQuery({
    queryKey: ['guestBookList'],
    queryFn: getGuestBookList,
  });

  // ✅ 단건 방명록 조회 (ID를 동적으로 받아올 수 있음)
  const getGuestBook = async (id: number) => {
    return queryClient.fetchQuery({
      queryKey: ['guestBook', id],
      queryFn: () => getGuestBookById(id),
    });
  };

  // ✅ 방명록 작성 (성공 후 리스트를 갱신)
  const { mutate: createGuestBookMutation, isPending: isCreatingGuestBook } = useMutation({
    mutationFn: createGuestBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guestBookList'] }); // 리스트 자동 갱신
    },
  });

  return {
    isGuestBookListLoading,
    isCreatingGuestBook,
    guestBookList,
    getGuestBook,
    createGuestBook: createGuestBookMutation,
  };
};

export default useGuestBookController;
