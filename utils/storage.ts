export const getImageUrl = (path: string) => {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET!}/${path}`;
};
// https://fpvshxdloaswkodxjdlf.supabase.co/storage/v1/object/public/your-wedding//10.jpg
