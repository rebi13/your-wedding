import { SupabaseClient } from '@supabase/supabase-js';
import { getImages } from '@/actions/image.actions';
import { createServerSideClient } from '@/lib/supabase';
import { Database } from '@/types/supabase';

jest.mock('@/lib/supabase');

describe('getImages', () => {
  let mockSupabase: jest.Mocked<SupabaseClient<Database>>;
  let mockStorageFrom: any;

  beforeEach(() => {
    mockStorageFrom = {
      list: jest.fn().mockResolvedValue({
        data: [{ name: 'image1.jpg' }, { name: 'image2.png' }],
        error: null,
      }),
    };

    mockSupabase = {
      storage: {
        from: jest.fn().mockReturnValue(mockStorageFrom),
      },
    } as unknown as jest.Mocked<SupabaseClient<Database>>;

    (createServerSideClient as jest.Mock).mockResolvedValue(mockSupabase);
  });

  test('should return list of images from storage bucket', async () => {
    const result = await getImages();

    expect(mockSupabase.storage.from).toHaveBeenCalledWith(process.env.NEXT_PUBLIC_STORAGE_BUCKET!);
    expect(mockStorageFrom.list).toHaveBeenCalled();
    expect(result).toEqual([{ name: 'image1.jpg' }, { name: 'image2.png' }]);
  });
});
