import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api'
import { cookie } from '@/utils'

export const useAuthStore = defineStore('auth', () => {
  const status = ref(false)
  const user = ref()

  async function login(params) {
    const { data } = await api.users.login(params)
    const { nickname, token } = data
    cookie.set(token)
    status.value = true
    user.value = nickname
  }
  
  async function authCheck(dummyState) {
    console.log('auth check')
    status.value = dummyState
    console.log('is authenticated:', status.value)
  }

  return { status, user, login, authCheck }
})
