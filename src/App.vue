<template>
  <div class="app-container" v-if="!loading">
    <NavBar />
    <RouterView />
    <Contact />
  </div>
  <div class="app-container" v-else>
    <SplashView />
  </div>
</template>

<script setup>
import SplashView from '@/views/splashview.vue';
import Contact from '@/views/ContactView.vue';
import NavBar from '@/components/NavBar.vue';
import { RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'

const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 5000)
})
</script>
  
<style scoped>
@import '@/style/app.css';
</style>
