<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import addIcon from '@/icons/addIcon.vue'
import minusIcon from '@/icons/minusIcon.vue'
import deleteIcon from '@/icons/DeleteIcon.vue'
import { useRouter, useRoute } from 'vue-router'

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
    ProductData.value = response.data
  } catch (err) {
    console.error(err)
  }
}

const Add = () => {
  quantity.value ++
}

const Minus = () => {
  if( quantity.value > 1) {
    quantity.value --;
  } else {
    quantity.value = 1;
  }
}


const addToCart = async () => {
  if (customerId.value.trim() !== '') {
    try {
      const formData = new FormData()
      formData.append('customerId', customerId.value)
      formData.append('productId', `${route.params.itemID}`)
      formData.append('quantity', quantity.value)

      const response = await axios.post(`${serverHost}/cart/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      alert('Added to cart')
    } catch (err) {
      console.error(err)
    }
  } else {
    alert('Login to add to cart')
  }
}

onMounted(() => {
  getProduct()
})
</script>

<template>
  <div class="cart-contain" v-if="ProductData.length > 0">
    <div class="cart-wrapper" v-for="product in ProductData" :key="product._id">
      <div class="cart-layout">
        <div class="cart-lay1" :style="{ backgroundImage: `url(${product.image})` }">
          <!-- product image -->
        </div>
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
                <div class="cart-in" @click="Add()">
                  <addIcon class="icon-add" />
                </div>
                <div class="quantity">
                  {{ quantity }}
                </div>
                <div class="cart-in" @click="Minus()">
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
  <div class="cart-contain no-data" v-else>
    <h1>Items empty</h1>
  </div>
</template>
<style>
@import '@/style/shopitem.css';
</style>
