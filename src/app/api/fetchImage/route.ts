import axios from 'axios'

const clientId = process.env.UNSPLASH_ACCESS

const UNSPLASH_ROOT = 'https://api.unsplash.com'
const getPhotosByQuery = async ({ query }: { query: any }) => {
  const { data } = await axios.get(
    `${UNSPLASH_ROOT}/search/photos?query=${query}&client_id=8lE85nAHx0px6p0xayI3d75WhJUCXi2_lk7XrbxxENg&per_page=1&orientation=landscape`
  )
  return data
}

export  default getPhotosByQuery;