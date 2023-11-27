<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

defineProps({
  subtotal: Number,
  delivery: Number
})

const router = useRouter()

const btnTitle = ref('checkout')

const pay = () => {
  if (!authStore.token) {
    router.push({ name: 'Login' })
  } else {
    router.push({ name: 'Payment' })
  }
}
</script>
<template>
  <div class="checkout-container">
    <div class="checkinfo">
      <div>
        <h1>Subtotal:</h1>
      </div>
      <span>Ksh {{ subtotal }}</span>
    </div>
    <div class="checkinfo">
      <div>
        <h1>Delivery fee:</h1>
      </div>
      <span>Ksh {{ delivery }}</span>
    </div>
    <div class="checkinfo">
      <div>
        <h1>Total:</h1>
      </div>
      <span>Ksh {{ subtotal + delivery }}</span>
    </div>
    <div class="checkout-btn-contain">
      <button class="checkout-btn" @click="pay()">{{ btnTitle }}</button>
    </div>
  </div>
</template>
<style>
@import '@/style/checkout.css';
</style>
