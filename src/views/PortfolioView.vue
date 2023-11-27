<template>
<template v-if="data.length > 0">
  <div class="portfolio-container">
    <div class="portfolio-content">
      <div class="portfolio-header">
        <h1>Some of the projects we have done</h1>
      </div>
      <div
        class="portfolio-wrapper"
        v-for="(
          {
            title,
            image,
            description,
          },
          index
        ) in data"
        :key="index"
      >
        <div
          class="portfolio-img"
          :class="[
            image == !'' ? 'portfolio-img' : 'portfolio-skeleton',
          ]"
        >
          <img class="img-wrapper" :src="image" :alt="title" />
        </div>
        <div class="portfolio-info">
          <h1>{{ title }}</h1>
          <div class="info-details">
            <p>{{ description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<template v-else>
  <div class="trending-card t-c">
    <h1>No portfolio added </h1>
  </div>
</template>
</template>
<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const data = ref([])

const serverHost = import.meta.env.VITE_SERVER_HOST

const getWork = async () => {
  try {
    const response = await axios.get(
      `${serverHost}/work`
    )
    data.value = response.data
  } catch (err) {
    console.log(err)
  }
}
onMounted(() => {
  getWork()
})

</script>
<style>
@import '@/style/trending.css';
@import "../style/portfolio.css";
</style>
