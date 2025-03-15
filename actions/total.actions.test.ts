import { SupabaseClient } from '@supabase/supabase-js';
import { getTotalData } from '@/actions/total.actions';
import { createServerSideClient } from '@/lib/supabase';
import { Database } from '@/types/supabase';

jest.mock('@/lib/supabase');

describe('getTotalData', () => {
  let mockSupabase: jest.Mocked<SupabaseClient<Database>>;
  let mockQueryBuilder: any;

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {}); // ✅ console.error 무시

    mockQueryBuilder = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      maybeSingle: jest.fn().mockResolvedValue({
        data: { id: 1, data: { hello: 'world' } },
        error: null,
      }),
    };

    mockSupabase = {
      from: jest.fn().mockReturnValue(mockQueryBuilder),
    } as unknown as jest.Mocked<SupabaseClient<Database>>;

    (createServerSideClient as jest.Mock).mockResolvedValue(mockSupabase);
  });

  test('should return parsed total data', async () => {
    const result = await getTotalData();

    expect(mockSupabase.from).toHaveBeenCalledWith('Total');
    expect(mockQueryBuilder.select).toHaveBeenCalledWith('*');
    expect(mockQueryBuilder.eq).toHaveBeenCalledWith('id', 1);
    expect(result).toEqual({ hello: 'world' });
  });

  test('should return null if error occurs', async () => {
    mockQueryBuilder.maybeSingle.mockResolvedValueOnce({
      data: null,
      error: { message: 'Something went wrong' },
    });

    const result = await getTotalData();
    expect(result).toBeNull();
  });
});
