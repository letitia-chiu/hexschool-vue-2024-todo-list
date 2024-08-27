import axios from 'axios'

const BASE_URL = 'https://todolist-api.hexschool.io/todos'

export const get = async () => {
  return axios.get(`${BASE_URL}/`)
}

export const post = async (content) => {
  return axios.post(`${BASE_URL}/`, { content })
}

export const put = async (todoId, content) => {
  return axios.put(`${BASE_URL}/${todoId}`, { content })
}

export const del = async (todoId) => {
  return axios.delete(`${BASE_URL}/${todoId}`)
}

export const toggle = async (todoId) => {
  return axios.patch(`${BASE_URL}/${todoId}/toggle`, { id: todoId })
}
