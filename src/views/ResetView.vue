<template>
  <div class="auth-container">
    <div class="form-l-wrapper">
      <h1>Reset password</h1>
      <form @submit.prevent="resetPassword" class="l-form">
        <input type="text" class="input-l" placeholder="code sent to your email" v-model="code" />
        <input type="email" class="input-l" placeholder="Email Address" v-model="email" />
        <input
          type="password"
          class="input-l"
          placeholder="password 8 character (capital,lowercase,number)"
          v-model="password"
        />
        <input
          type="password"
          class="input-l"
          placeholder="confirm Password"
          v-model="confirmPassword"
        />
        <p>{{ errMsg }}</p>
        <button class="btn-f" type="submit">Reset</button>
      </form>
      <span>or</span>
      <div class="l-alternatives">
        <button class="alt-btn" @click="login">Login</button>
        <span @click="goHome()" class="reverse">Go back home</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useToast } from 'vue-toastification'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

const authStore = useAuthStore()
const toast = useToast()
const router = useRouter()
const password = ref('')
const errMsg = ref('')
const email = ref('')
const code = ref('')
const confirmPassword = ref('')

const reset = () => {
  email.value = ''
  password.value = ''
  code.value = ''
}

const resetPassword = async () => {
  if (email.value !== '' && password.value !== '' && code.value !== '') {
    try {
      const response = await axios.post(`${SERVER_HOST}/auth/resetPassword`, {
        email: email.value,
        password: password.value,
        resetCode: code.value
      })
      const token = response.data.token
      authStore.toggleToken(JSON.stringify(token))
      router.push({ name: 'Login' })
      errMsg.value = response.data.message
      //  alert(errMsg.value)
      toast.error(errMsg.value)
    } catch (error) {
      errMsg.value = 'Invalid email or password'
      //  alert(errMsg.value)
      toast.error(errMsg.value)
    }
  } else {
    errMsg.value = 'Write something'
    reset()
  }
}

// const loginInWithGoogle = () => {

// }

const login = () => {
  router.push({ name: 'Login' })
}
</script>

<style>
@import '../style/auth.css';
</style>
