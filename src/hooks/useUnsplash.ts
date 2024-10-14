
import { useQuery } from 'react-query'
import getPhotosByQuery from '~/app/api/fetchImage/route'

const staleTime = 1000 * 60 * 60 * 2

export const useGetPhotosByQuery = ({ query }: { query: string }) =>
  useQuery(query, () => getPhotosByQuery({ query }), {
    staleTime
  })