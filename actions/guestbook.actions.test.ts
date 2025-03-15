import { SupabaseClient } from '@supabase/supabase-js';
import {
  checkGuestBookPassword,
  createGuestBook,
  deleteGuestBookSoft,
  getGuestBookById,
  getGuestBookList,
  updateGuestBook,
} from '@/actions/guestbook.actions';
import { createServerSideClient } from '@/lib/supabase';
import { Database } from '@/types/supabase';
import { compareHashPassword, hashPassword } from '@/utils/password';

jest.mock('@/lib/supabase');
jest.mock('@/utils/password', () => ({
  hashPassword: jest.fn().mockResolvedValue('hashed_password'),
  compareHashPassword: jest.fn(() => Promise.resolve(true)),
}));

describe('GuestBook Actions', () => {
  let mockSupabase: jest.Mocked<SupabaseClient<Database>>;
  let mockQueryBuilder: any;

  beforeEach(() => {
    const mockChainedBuilder = {
      eq: jest.fn().mockReturnThis(),
      is: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      range: jest.fn().mockReturnThis(),
      maybeSingle: jest.fn().mockResolvedValue({ data: { id: 1, content: 'Hello' }, error: null }),
      single: jest.fn().mockResolvedValue({ data: { password: 'hashed_password' }, error: null }),
      select: jest.fn().mockResolvedValue({
        data: [{ id: 1, content: 'Test' }],
        count: 5,
        error: null,
      }),
    };

    const mockInsertBuilder = {
      select: jest.fn().mockResolvedValue({
        data: [{ id: 1, name: 'John', content: 'Hi', password: 'hashed_password' }],
        error: null,
      }),
    };

    const mockUpdateBuilder = {
      eq: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnValue({
        single: jest.fn().mockResolvedValue({
          data: {
            id: 1,
            name: 'John Updated',
            content: 'Hello Updated',
            password: 'hashed_password',
          },
          error: null,
        }),
      }),
    };

    mockQueryBuilder = {
      ...mockChainedBuilder,
      select: jest.fn().mockReturnValue({
        ...mockChainedBuilder,
        range: jest.fn().mockResolvedValue({
          data: [{ id: 1, content: 'Test' }],
          count: 5,
          error: null,
        }),
        maybeSingle: jest
          .fn()
          .mockResolvedValue({ data: { id: 1, content: 'Hello' }, error: null }),
      }),
      insert: jest.fn().mockReturnValue(mockInsertBuilder),
      update: jest.fn().mockReturnValue(mockUpdateBuilder),
    };

    mockSupabase = {
      from: jest.fn().mockReturnValue(mockQueryBuilder),
    } as unknown as jest.Mocked<SupabaseClient<Database>>;

    (createServerSideClient as jest.Mock).mockResolvedValue(mockSupabase);
  });

  test('getGuestBookList should return paginated data', async () => {
    const result = await getGuestBookList({ pageParam: 0 });
    expect(result).toEqual({
      data: [{ id: 1, content: 'Test' }],
      nextPage: 1,
      isLastPage: false,
    });
  });

  test('getGuestBookById should return a single guestbook entry', async () => {
    const result = await getGuestBookById(1);
    expect(result).toEqual({ id: 1, content: 'Hello' });
  });

  test('createGuestBook should insert new guestbook entry with hashed password', async () => {
    const result = await createGuestBook({ name: 'John', content: 'Hi', password: '1234' });
    expect(hashPassword).toHaveBeenCalledWith('1234');
    expect(result).toEqual([{ id: 1, name: 'John', content: 'Hi', password: 'hashed_password' }]);
  });

  test('checkGuestBookPassword should verify password correctly', async () => {
    (compareHashPassword as jest.Mock).mockImplementation(
      async ({ password, hashedPassword }) =>
        password === '1234' && hashedPassword === 'hashed_password'
    );
    const result = await checkGuestBookPassword(1, '1234');
    expect(result).toBe(true);
  });

  test('updateGuestBook should update an existing guestbook entry with hashed password', async () => {
    const result = await updateGuestBook(1, 'John Updated', 'Hello Updated', '5678');
    expect(hashPassword).toHaveBeenCalledWith('5678');
    expect(result).toEqual({
      id: 1,
      name: 'John Updated',
      content: 'Hello Updated',
      password: 'hashed_password',
    });
  });

  test('deleteGuestBookSoft should soft delete a guestbook entry', async () => {
    mockQueryBuilder.update.mockReturnValue({
      eq: jest.fn().mockReturnThis(),
      select: jest.fn().mockResolvedValue({
        data: { id: 1, deleted_YN: true },
        error: null,
      }),
    });

    const result = await deleteGuestBookSoft(1);
    expect(result).toEqual({ id: 1, deleted_YN: true });
  });
});
