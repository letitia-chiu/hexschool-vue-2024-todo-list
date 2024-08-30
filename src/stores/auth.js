import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api'
import { cookie, errorHandler } from '@/utils'

export const useAuthStore = defineStore('auth', () => {
  const status = ref(false)
  const user = ref()
  const token = ref()

  async function login(params) {
    const { data } = await api.users.login(params)
    const { nickname, token, exp } = data
    cookie.set(token, exp)
    status.value = true
    user.value = nickname
  }

  async function logout() {
    try {
      await api.users.logout(token.value)
      status.value = false
      cookie.delete()
    } catch (error) {
      errorHandler(error)
    }
  }
  
  async function authCheck() {
    try {
      const storedToken = cookie.get()
      if (!storedToken) return
      
      token.value = storedToken
      const { data } = await api.users.checkAuth(token.value)
      
      user.value = data.nickname
      status.value = true
    } catch (error) {
      status.value = false
      errorHandler(error)
    }
  }

  return { status, user, token, login, logout, authCheck }
})
