<script setup>
import { useSearchStore } from '@/stores/search'
import { useRouter } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const router = useRouter()
const ProductData = ref([])
const searchStore = useSearchStore()

const serverHost = import.meta.env.VITE_SERVER_HOST

const getProductData = async () => {
  try {
    const response = await axios.get(`${serverHost}/products`)
    ProductData.value = response.data
  } catch (err) {
    console.log(err)
  }
}

const  result = computed (() => {
  if (searchStore.searchParam) {
    return ProductData.value.filter((item) => {
      return item.name.toLowerCase().includes(searchStore.searchParam.toLowerCase())
    })
  } else {
    return ProductData.value
  }
})

const getProduct = (id) => {
  router.push({ name: 'Item', params: { itemID: id } })

}

const getTopProduct = () => {
  return ProductData.value[0]

}

onMounted(() => {
  getProductData()
})


</script>
<template>
  <div class="top-component" v-if="ProductData.length > 0">
    <div class="main-product"  @click="getProduct(getTopProduct()._id)">
      <img :src="getTopProduct().image" :alt="getTopProduct().name" class="main-product-img" />
      <h1>{{ getTopProduct().name }}</h1>
    </div>
    <div class="sub-product">
      <div v-for="product in result" :key="product._id" @click="getProduct(product._id)" class="sub-product-card">
        <img :src="product.image" :alt="product.name" class="sub-product-img" />
        <h1>{{ product.name }}</h1>
      </div>
    </div>
  </div>
  <div class="top-component no-data" v-else>
    <h1>shop items empty</h1>
  </div>
</template>

<style scoped>
@import '@/style/topProduct.css';
</style>
