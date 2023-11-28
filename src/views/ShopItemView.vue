<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import addIcon from '@/icons/AddIcon.vue'
import minusIcon from '@/icons/minusIcon.vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
const toast = useToast()

const quantity = ref(1)
const route = useRoute()
const router = useRouter()
const ProductData = ref([])
const customerId = ref(localStorage.getItem('customerId') || '')
const serverHost = import.meta.env.VITE_SERVER_HOST

const buyNow = (id) => {
  router.push({ name: 'Payment' })
  localStorage.setItem('productId', id)
}

const getProduct = async () => {
  try {
    const response = await axios.get(`${serverHost}/products/${route.params.itemID}`)
    ProductData.value = Array.isArray(response.data) ? response.data : [response.data]
  } catch (error) {
    console.error('Error fetching product:', error)
  }
}

const addToCart = async () => {
  if (customerId.value !== null) {
    try {
      const payload = {
        customerId: customerId.value,
        productId: route.params.itemID,
        quantity: quantity.value
      }

      const response = await axios.post(`${serverHost}/cart/add`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      toast.success('Item added to cart')
    } catch (err) {
      if (err.response.data.error === 'customerId is required') {
        toast.error('Kindly login to proceed with purchase')
      }
    }
  } else {
    toast.info('Log in to add item to cart')
  }
}

const add = () => {
  quantity.value++
}

const minus = () => {
  if (quantity.value > 1) {
    quantity.value--
  } else {
    quantity.value = 1
  }
}

onMounted(async () => {
  await getProduct()
})
</script>
<template>
  <div class="cart-contain" v-if="ProductData.length > 0">
    <div v-for="product in ProductData" :key="product._id" class="cart-wrapper">
      <div class="cart-layout">
        <div class="cart-lay1" :style="{ backgroundImage: `url(${product.image})` }"></div>
        <div class="cart-lay2">
          <div class="cart-h">
            <h1>{{ product.name }}</h1>
          </div>
          <div class="sideline">
            <div class="cart-price">
              <h4>Price:</h4>
              <span>Ksh {{ product.price }}</span>
            </div>
            <div class="cart-no">
              <div class="inc-contain">
                <div class="cart-in" @click="add()">
                  <addIcon class="icon-add" />
                </div>
                <div class="quantity">
                  {{ quantity }}
                </div>
                <div class="cart-in" @click="minus()">
                  <minusIcon class="icon-minus" />
                </div>
              </div>
            </div>
            <div class="btn-shop-item">
              <button class="btn-shop" @click="addToCart(product._id)">Add to cart</button>
              <button class="btn-shop shop-buy" @click="buyNow(product._id)">Buy now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="cart-contain no-data">
    <h1>Items empty</h1>
  </div>
</template>

<style>
@import '@/style/shopitem.css';
</style>
