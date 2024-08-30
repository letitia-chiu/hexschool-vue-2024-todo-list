import axios from 'axios'

const BASE_URL = 'https://todolist-api.hexschool.io/users'

export const signup = async (params) => {
  return axios.post(`${BASE_URL}/sign_up`, params)
}

export const login = async (params) => {
  return axios.post(`${BASE_URL}/sign_in`, params)
}

export const checkAuth = async (token) => {
  return axios.get(`${BASE_URL}/checkout`, { headers: { 'Authorization': token }})
}

export const logout = async (token) => {
  return axios.post(`${BASE_URL}/sign_out`, {}, { headers: { 'Authorization': token }})
}
