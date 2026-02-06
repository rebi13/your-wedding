import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  checkGuestBookPassword,
  createGuestBook,
  deleteGuestBookSoft,
  getGuestBookById,
  getGuestBookList,
  updateGuestBook,
} from '@/actions/guestbook.actions';
import { Database } from '@/types/supabase';

export type GuestBookDto = Database['public']['Tables']['GuestBook']['Row'];

// ✅ 단일 방명록 조회 훅 (별도 분리하여 Hook 규칙 준수)
export const useGuestBook = (id: number) => {
  return useQuery<GuestBookDto | null>({
    queryKey: ['guestBook', id],
    queryFn: () => getGuestBookById(id),
    enabled: !!id, // id가 있을 때만 실행
  });
};

// ✅ 비밀번호 검증 훅 (별도 분리하여 Hook 규칙 준수)
export const usePasswordMatch = () => {
  return useMutation({
    mutationFn: ({ id, password }: { id: number; password: string }) =>
      checkGuestBookPassword(id, password),
  });
};

const useGuestBookController = () => {
  const queryClient = useQueryClient();

  // ✅ 방명록 리스트 가져오기 (3개씩 무한 로드)
  const {
    data: guestBookPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isGuestBookListLoading,
  } = useInfiniteQuery({
    queryKey: ['guestBookList'],
    queryFn: ({ pageParam = 0 }) => getGuestBookList({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage, // undefined면 hasNextPage = false
  });

  // ✅ 데이터 평탄화
  const guestBookList = (guestBookPages?.pages.flatMap((page) => page.data) ??
    []) as GuestBookDto[];

  // ✅ 방명록 작성
  const { mutate: createGuestBookMutation, isPending: isCreatingGuestBook } = useMutation({
    mutationFn: createGuestBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guestBookList'] }); // 리스트 자동 갱신
    },
  });

  // ✅ 방명록 수정
  const { mutate: updateGuestBookMutation, isPending: isUpdatingGuestBook } = useMutation({
    mutationFn: ({
      id,
      name,
      content,
      password,
    }: {
      id: number;
      name: string;
      content: string;
      password: string;
    }) => updateGuestBook(id, name, content, password),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['guestBookList'] }); // 전체 목록 갱신
      queryClient.invalidateQueries({ queryKey: ['guestBook', variables.id] }); // 수정된 항목만 갱신
    },
  });

  // ✅ 방명록 삭제 (Soft Delete)
  const { mutate: deleteGuestBookMutation, isPending: isDeletingGuestBook } = useMutation({
    mutationFn: (id: number) => deleteGuestBookSoft(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['guestBookList'] }); // 리스트 자동 갱신
      queryClient.invalidateQueries({ queryKey: ['guestBook', id] }); // 개별 항목 무효화
    },
  });

  return {
    isGuestBookListLoading,
    isCreatingGuestBook,
    isUpdatingGuestBook,
    isDeletingGuestBook,
    guestBookList,
    fetchNextPage, // 더보기 버튼과 연결
    hasNextPage,
    isFetchingNextPage,
    createGuestBook: createGuestBookMutation,
    updateGuestBook: updateGuestBookMutation,
    deleteGuestBook: deleteGuestBookMutation,
  };
};

export default useGuestBookController;
