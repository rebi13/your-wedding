import { useQuery } from '@tanstack/react-query';
import { getImages } from '@/actions/image.actions';
import { getTotalData } from '@/actions/total.actions';
import { WeddingData } from '@/types/wedding';

const useTotalController = () => {
  // ✅ 이미지 조회 (React Query 사용)
  const getWeddingImages = () => {
    return useQuery({
      queryKey: ['images'],
      queryFn: () => getImages(),
    });
  };

  // ✅ 페이지에 표시할 텍스트 json 데이터 조회 (React Query 사용)
  const getTotalDatas = () => {
    return useQuery({
      queryKey: ['total'],
      queryFn: () => getTotalData(),
      select: (data): WeddingData => {
        // data를 WeddingData 타입으로 변환
        return data as WeddingData;
      },
    });
  };

  return {
    getWeddingImages,
    getTotalDatas,
  };
};

export default useTotalController;
