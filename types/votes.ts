export interface CatVote {
  id: number
  image_id: string
  sub_id: string
  created_at: string
  value: number
  country_code: string
  image: {
    id: string
    url: string
  }
}
