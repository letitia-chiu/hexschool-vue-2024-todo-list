<script setup>
import SideBanner from '@/components/SideBanner.vue'
import { computed, ref } from 'vue'
import validator from '@/utils/validator'
import { useRouter } from 'vue-router'

const router = useRouter()

const registerInput = ref({
  email: '',
  nickname: '',
  password: '',
  confirmPassword: ''
})

const isValid = computed(() => {
  const input = registerInput.value
  return {
    email: validator(input.email, 'email'),
    nickname: !!input.nickname,
    password: validator(input.password, 'password'),
    confirmPassword: input.confirmPassword === input.password
  }
})

const inputIncompleted = computed(() => {
  return Object.values(isValid.value).includes(false)
})

const handleRegister = () => {
  console.log(registerInput.value)
  alert('註冊成功')
  router.push('/login')
}

</script>

<template>
  <div id="signUpPage" class="bg-yellow">
    <div class="conatiner signUpPage vhContainer">
      <SideBanner />
      <div>
        <form class="formControls">
          <h2 class="formControls_txt">註冊帳號</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            v-model="registerInput.email"
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            placeholder="請輸入 email"
            required
          />
          <span v-if="!isValid.email">請正確輸入 email</span>
          <label class="formControls_label" for="name">您的暱稱</label>
          <input
            v-model="registerInput.nickname"
            class="formControls_input"
            type="text"
            name="name"
            id="name"
            placeholder="請輸入您的暱稱"
          />
          <span v-if="!isValid.nickname">請輸入暱稱</span>
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            v-model="registerInput.password"
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請輸入密碼"
            required
          />
          <span v-if="!isValid.password">密碼需 8 ~ 12 字元</span>
          <label class="formControls_label" for="pwdConfirm">再次輸入密碼</label>
          <input
            v-model="registerInput.confirmPassword"
            class="formControls_input"
            type="password"
            name="pwdConfirm"
            id="pwdConfirm"
            placeholder="請再次輸入密碼"
            required
          />
          <span v-if="!isValid.confirmPassword">密碼不符</span>
          <button type="button" class="formControls_btnSubmit" @click="handleRegister" :disabled="inputIncompleted">註冊帳號</button>
          <router-link to="/login" class="formControls_btnLink">登入</router-link>
        </form>
      </div>
    </div>
  </div>
</template>
