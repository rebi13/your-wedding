// hooks/useGuestBookController.test.tsx

import React, { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render, renderHook, waitFor } from '@testing-library/react';
import * as actions from '@/actions/guestbook.actions';
import useGuestBookController, {
  useGuestBook,
  usePasswordMatch,
} from '@/hooks/useGuestBookController';

jest.mock('@/actions/guestbook.actions');

const mockGuestBook = {
  id: 1,
  name: '홍길동',
  content: '안녕하세요',
  created_at: new Date().toISOString(),
  password: '1234',
  deleted_YN: false,
};

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

const createWrapper = () => {
  const client = createTestQueryClient();
  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
};

describe('useGuestBookController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('방명록 리스트를 불러온다', async () => {
    (actions.getGuestBookList as jest.Mock).mockImplementation(async () => ({
      data: [mockGuestBook],
      nextPage: undefined,
      isLastPage: true,
    }));

    const wrapper = createWrapper();
    const { result } = renderHook(() => useGuestBookController(), { wrapper });

    await waitFor(() => {
      expect(result.current.guestBookList.length).toBeGreaterThan(0);
    });

    expect(result.current.guestBookList[0]?.name).toBe('홍길동');
  });

  it('방명록 리스트 불러오기 실패 시 처리', async () => {
    (actions.getGuestBookList as jest.Mock).mockRejectedValue(new Error('API 실패'));

    const wrapper = createWrapper();
    const { result } = renderHook(() => useGuestBookController(), { wrapper });

    // infiniteQuery가 에러가 나면 guestBookList는 평탄화 결과로 [] 유지
    await waitFor(() => {
      expect(result.current.guestBookList.length).toBe(0);
    });
  });

  it('단일 방명록 조회 성공', async () => {
    (actions.getGuestBookById as jest.Mock).mockResolvedValue(mockGuestBook);

    const wrapper = createWrapper();

    // ✅ useGuestBook 훅을 직접 테스트 (별도 분리된 훅)
    const { result } = renderHook(() => useGuestBook(1), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.name).toBe('홍길동');
  });

  it('단일 방명록 조회 실패', async () => {
    (actions.getGuestBookById as jest.Mock).mockRejectedValue(new Error('조회 실패'));

    const wrapper = createWrapper();

    // ✅ useGuestBook 훅을 직접 테스트 (별도 분리된 훅)
    const { result } = renderHook(() => useGuestBook(99), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeDefined();
  });

  it('방명록 생성 성공', async () => {
    (actions.createGuestBook as jest.Mock).mockResolvedValue({ id: 123 });

    const wrapper = createWrapper();
    const { result } = renderHook(() => useGuestBookController(), { wrapper });

    await act(() =>
      result.current.createGuestBook({
        name: '작성자',
        content: '내용입니다',
        password: 'pw1234',
      })
    );

    expect(actions.createGuestBook).toHaveBeenCalled();
  });

  it('방명록 생성 실패', async () => {
    (actions.createGuestBook as jest.Mock).mockRejectedValue(new Error('생성 실패'));

    const wrapper = createWrapper();
    const { result } = renderHook(() => useGuestBookController(), { wrapper });

    await expect(
      act(() =>
        result.current.createGuestBook({
          name: '작성자',
          content: '내용입니다',
          password: 'pw1234',
        })
      )
    ).resolves.toBeUndefined();
  });

  it('방명록 수정 성공', async () => {
    (actions.updateGuestBook as jest.Mock).mockResolvedValue(true);

    const wrapper = createWrapper();
    const { result } = renderHook(() => useGuestBookController(), { wrapper });

    await act(() =>
      result.current.updateGuestBook({
        id: 1,
        name: '수정자',
        content: '수정된 내용',
        password: 'pw',
      })
    );

    expect(actions.updateGuestBook).toHaveBeenCalled();
  });

  it('방명록 삭제 성공', async () => {
    (actions.deleteGuestBookSoft as jest.Mock).mockResolvedValue(true);

    const wrapper = createWrapper();
    const { result } = renderHook(() => useGuestBookController(), { wrapper });

    await act(() => result.current.deleteGuestBook(1));

    expect(actions.deleteGuestBookSoft).toHaveBeenCalled();
  });

  it('비밀번호 확인 성공', async () => {
    (actions.checkGuestBookPassword as jest.Mock).mockResolvedValue(true);

    const wrapper = createWrapper();
    // ✅ usePasswordMatch 훅을 직접 테스트 (별도 분리된 훅)
    const { result } = renderHook(() => usePasswordMatch(), { wrapper });

    await act(async () => {
      const res = await result.current.mutateAsync({ id: 1, password: '1234' });
      expect(res).toBe(true);
    });

    expect(actions.checkGuestBookPassword).toHaveBeenCalledWith(1, '1234');
  });

  it('비밀번호 확인 실패', async () => {
    (actions.checkGuestBookPassword as jest.Mock).mockRejectedValue(new Error('비번 틀림'));

    const wrapper = createWrapper();
    // ✅ usePasswordMatch 훅을 직접 테스트 (별도 분리된 훅)
    const { result } = renderHook(() => usePasswordMatch(), { wrapper });

    await expect(result.current.mutateAsync({ id: 1, password: 'wrong' })).rejects.toThrow(
      '비번 틀림'
    );
  });

  it('hasNextPage가 false일 경우', async () => {
    (actions.getGuestBookList as jest.Mock).mockResolvedValue({
      data: [mockGuestBook],
      nextPage: undefined,
      isLastPage: true,
    });

    const wrapper = createWrapper();
    const { result } = renderHook(() => useGuestBookController(), { wrapper });

    await waitFor(() => result.current.guestBookList.length > 0);
    expect(result.current.hasNextPage).toBe(false);
  });

  it('fetchNextPage 호출 가능', async () => {
    (actions.getGuestBookList as jest.Mock).mockImplementation(async ({ pageParam }) => ({
      data: [mockGuestBook],
      nextPage: pageParam < 1 ? 1 : undefined,
      isLastPage: pageParam >= 1,
    }));

    const wrapper = createWrapper();
    const { result } = renderHook(() => useGuestBookController(), { wrapper });

    await waitFor(() => result.current.guestBookList.length > 0);

    await act(() => result.current.fetchNextPage());
    expect(actions.getGuestBookList).toHaveBeenCalledTimes(2);
  });
});
