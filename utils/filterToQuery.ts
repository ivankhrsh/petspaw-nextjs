import { type Filter } from '@/types/filter'

export const filterToQuery = (filters: Filter): string => {
  const queryParams = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString())
    }
  })

  return queryParams.toString()
}
