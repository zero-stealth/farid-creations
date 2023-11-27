<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ProductCard from '@/components/ProductCard.vue'

const router = useRouter()
const ProductData = ref([])
const serverHost = import.meta.env.VITE_SERVER_HOST

const getProductData = async () => {
  try {
    const response = await axios.get(`${serverHost}/products`)
    ProductData.value = response.data
  } catch (err) {
    console.log(err)
  }
}

const countdown = ref('10:8:08')
const hours = ref(null)
const minutes = ref(null)
const seconds = ref(null)

let timer

const getTopProduct = () => {
  return ProductData.value[0]
}



const updateCountdown = () => {
  timer = setInterval(() => {
    const [currentHours, currentMinutes, currentSeconds] = countdown.value.split(':').map(Number)

    let totalSeconds = currentHours * 3600 + currentMinutes * 60 + currentSeconds - 1

    if (totalSeconds <= 0) {
      clearInterval(timer)
    } else {
      hours.value = Math.floor(totalSeconds / 3600)
      minutes.value = Math.floor((totalSeconds % 3600) / 60)
      seconds.value = totalSeconds % 60
      countdown.value = `${String(hours.value).padStart(2, '0')}:${String(minutes.value).padStart(2, '0')}:${String(seconds.value).padStart(2, '0')}`
    }
  }, 1000)
}

onMounted(() => {
  updateCountdown()
  getProductData()

})

onBeforeUnmount(() => {
  clearInterval(timer)
})

const getProduct = (id) => {
  router.push({ name: 'Item', params: { itemID: id } })
}
</script>
<template>
  <div class="product-container" v-if="ProductData.length > 0">
    <div class="product-top">
      <div class="product-top-header">
        <h1>Deals of the <span>day!</span></h1>
        <div class="time-start"> 
          <span>{{ hours }} </span> Hrs
          <span>{{ minutes }}</span> M
          <span>{{ seconds }}</span> S
        </div>
        <p>Get it before the offer expires</p>
      </div>
      <div class="product-top-info"   @click="getProduct(getTopProduct()._id)">
        <span>{{ getTopProduct().quantity }}</span>
        <div class="product-img-contain">
            <img :src="getTopProduct().image" :alt="getTopProduct().name" class="product-img" />
        </div>
        <h1>{{ getTopProduct().name }}</h1>
      </div>
    </div>
    <div v-for="(product, index) in ProductData" :key="index">
      <ProductCard
        :offer="product.quantity"
        :type="product.type"
        :title="product.name"
        :price="product.price"
        :Image="product.image"
        @click="getProduct(product._id)"
      />
    </div>
  </div>
  <div class="product-container no-data" v-else>
    <span>No shop item added</span>
  </div>
</template>

<style scoped>
@import '@/style/product.css';
</style>
