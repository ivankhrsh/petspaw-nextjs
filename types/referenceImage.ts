import { type BreedFullInfo } from './breed'

export interface ReferenceImage {
  id: string
  url: string
  breeds: BreedFullInfo[]
  width: number
  height: number
}
