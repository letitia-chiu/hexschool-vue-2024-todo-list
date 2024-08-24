import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const status = ref(false)
  
  async function authCheck(dummyState) {
    console.log('auth check')
    status.value = dummyState
    console.log('is authenticated:', status.value)
  }

  return { status, authCheck }
})
