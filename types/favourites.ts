export interface CatFavourite {
  id: number
  image_id: string
  sub_id: string | null
  created_at: string
  image: {
    id: string
    url: string
  }
};
