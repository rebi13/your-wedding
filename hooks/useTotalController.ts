import { useQuery } from '@tanstack/react-query';
import { getGalleryImages, getImages } from '@/actions/image.actions';
import { getTotalData } from '@/actions/total.actions';
import { WeddingData } from '@/types/wedding';

const useTotalController = () => {
  // ✅ 갤러리 이미지 조회 (React Query 사용)
  const weddingImagesQuery = useQuery({
    queryKey: ['weddingImages'],
    queryFn: getGalleryImages,
  });

  // ✅ 이미지 조회 (React Query 사용)
  const imagesQuery = useQuery({
    queryKey: ['images'],
    queryFn: getImages,
  });

  // ✅ 페이지에 표시할 텍스트 json 데이터 조회 (React Query 사용)
  const totalDataQuery = useQuery({
    queryKey: ['total'],
    queryFn: getTotalData,
    select: (data): WeddingData => {
      return data as WeddingData;
    },
  });

  return {
    weddingImages: weddingImagesQuery.data,
    isWeddingImagesLoading: weddingImagesQuery.isLoading,
    isWeddingImagesError: weddingImagesQuery.isError,
    images: imagesQuery.data,
    isImagesLoading: imagesQuery.isLoading,
    isImagesError: imagesQuery.isError,

    totalData: totalDataQuery.data,
    isTotalDataLoading: totalDataQuery.isLoading,
    isTotalDataError: totalDataQuery.isError,
  };
};

export default useTotalController;
