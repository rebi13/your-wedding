// export const getImageUrl = (path: string) => {
//   return `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET!}/${path}`;
// };

export const getImageUrl = (path: string, width = 480, quality = 80) => {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${path}?width=${width}&quality=${quality}`;
};
