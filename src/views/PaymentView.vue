<script setup>
import axios from 'axios';
import Mpesa from '@/assets/mpesa.jpg';
import mpesa from '@/assets/mpesa.png';
import { useRouter } from 'vue-router';
import { onMounted, computed, ref } from 'vue';

const router = useRouter();
const phoneNumber = ref('');
const productData = ref([]);
const customerId = ref(localStorage.getItem('customerId') || '');
const productId = ref(localStorage.getItem('productId') || '');
const serverHost = import.meta.env.VITE_SERVER_HOST;

const getProduct = async (id) => {
  try {
    const response = await axios.get(`${serverHost}/products/${id}`);
    productData.value = response.data;
  } catch (err) {
    console.error(err);
  }
};

const getCartData = async (id) => {
  try {
    const response = await axios.get(`${serverHost}/cart/items/${id}`);
    productData.value = response.data;
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  if (productId.value.trim() !== '') {
    getProduct(productId.value);
  } else {
    getCartData(customerId.value);
  }
});

const total = computed(() => {
  return productData.value.reduce((acc, product) => {
    const productPrice = parseFloat(product.price) || 0;
    const productQuantity = product.quantity || 1;

    return 30 + acc + productPrice * productQuantity;
  }, 0);
});

const pay = async () => {
  if (phoneNumber.value.trim() !== '' && total.value > 0) {
    try {
      const payload = {
        amount: total.value,
        phoneNumber: phoneNumber.value,
      };

      const response = await axios.post(`${serverHost}/payment/stk`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        localStorage.setItem('paidProducts', JSON.stringify(productData.value));
        localStorage.setItem('totalPaidAmount', total.value);

        alert('Payment successful');
        router.push({ name: 'Receipt' });
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Payment failed. Please try again.');
    }
  } else {
    alert('Please enter a valid phone number');
  }
};
</script>
<template>
  <div class="main-mpesa">
    <div class="m-image" :style="{ backgroundImage: `url(${Mpesa})` }">
    </div>
    <div class="mpesa-py">
      <div class="payment-type">
        <img :src="mpesa" alt="mpesa" class="mpesa-logo" />
        <div class="payment-d">
          <h1>Payment for</h1>
          <ul>
            <li v-for="product in productData" :key="product._id">{{ product.name || product.productName }}</li>
          </ul>
        </div>
      </div>
      <div class="mpesa-container">
        <form @submit.prevent="pay" class="f-controller">
          <div class="input-container">
            <label for="phoneNumber">Mpesa phone number</label>
            <input type="text" placeholder="07xxxxxxx" class="f-input" v-model="phoneNumber" required />
          </div>
          <div class="input-container">
            <div class="info-amount">Ksh {{ total }}</div>
          </div>
          <div class="btn-wp">
            <button type="submit" class="btn-py">Pay Now</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
@import '@/style/payment.css';
</style>
