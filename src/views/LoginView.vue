<script setup>
import SideBanner from '@/components/SideBanner.vue'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { errorHandler, Toast, validator } from '@/utils'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const loginInput = ref({
  email: '',
  password: ''
})

// 表單輸入驗證
const isValid = computed(() => {
  const input = loginInput.value
  return {
    email: validator(input.email, 'email'),
    password: validator(input.password, 'password')
  }
})
const inputIncompleted = computed(() => {
  return Object.values(isValid.value).includes(false)
})

const handleLogin = async () => {
  try {
    await authStore.login(loginInput.value)
    Toast('success', '登入成功')
    router.push('/todo')
  } catch (error) {
    errorHandler(error)
  }
}

onMounted(async() => {
  await authStore.authCheck()
  if (authStore.status) router.push('/todo')
})
</script>

<template>
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer">
      <SideBanner />
      <div>
        <form class="formControls" action="index.html">
          <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            v-model="loginInput.email"
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            placeholder="請輸入 email"
            required
          />
          <span v-if="!isValid.email">請正確輸入 email</span>
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            v-model="loginInput.password"
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請輸入密碼"
            required
          />
          <span v-if="!isValid.password">請正確輸入密碼</span>
          <button
            type="button"
            class="formControls_btnSubmit"
            @click="handleLogin"
            :disabled="inputIncompleted"
          >
            登入
          </button>
          <router-link to="/register" class="formControls_btnLink">註冊帳號</router-link>
        </form>
      </div>
    </div>
  </div>
</template>
