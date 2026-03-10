import axios from 'axios'

const BASE_URL = 'https://dev.codeleap.co.uk/careers/'

export const getPosts = async (url = BASE_URL) => {
  const response = await axios.get(url)
  return response.data
}

export const createPost = async (data) => {
  const response = await axios.post(BASE_URL, data)
  return response.data
}

export const updatePost = async ({ id, data }) => {
  const response = await axios.patch(`${BASE_URL}${id}/`, data)
  return response.data
}

export const deletePost = async (id) => {
  await axios.delete(`${BASE_URL}${id}/`)
}
