<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const customerId = ref(localStorage.getItem('customerId') || '')

defineProps({
  subtotal: Number,
  delivery: Number
})

const router = useRouter()

const btnTitle = ref('checkout')

const pay = () => {
  if (customerId.value.trim() !== '') {
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
