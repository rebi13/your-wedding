import { useQuery } from '@tanstack/react-query';
import { getImages } from '@/actions/image.actions';

const useWeddingImageController = () => {
  // ✅ 단일 방명록 조회
  // ✅ 단일 방명록 조회 (React Query 사용)
  const getWeddingImages = () => {
    return useQuery({
      queryKey: ['images'],
      queryFn: () => getImages(),
    });
  };

  return {
    getWeddingImages,
  };
};

export default useWeddingImageController;
