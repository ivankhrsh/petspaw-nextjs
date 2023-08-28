export interface UploadResponse {
  id: string
  url: string
  width: number
  height: number
  original_filename: string
  approved: 0 | 1
  pending: 0
}
