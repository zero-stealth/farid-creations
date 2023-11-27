<script setup>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue'
import { useRoute , useRouter } from 'vue-router'
import Panel from '@/components/PanelComponent.vue'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()
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

const FilterProductdData = computed(() => {
  return ProductData.value.filter(product => product.type === route.params.category)
})

const getProduct = (id) => {
  router.push({ name: 'Item', params: { itemID: id } })
}

onMounted(() => {
  getProductData()

})

</script>
<template>
  <div class="shop-container">
    <Panel :imageName="route.params.category" />
  <div class="shop-product" v-if="FilterProductdData.length > 0">
    <div  v-for="(product, index) in FilterProductdData" :key="index">
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
  <div class="shop-product no-data" v-else>
    <h1>shop items empty</h1>
    </div>
  </div>
</template>
<style>
@import '@/style/shop.css';
</style>
