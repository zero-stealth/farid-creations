<script setup>
import { useRouter } from 'vue-router'
import branding from '@/assets/branding.png'
import ArrowThinIcon  from '@/icons/arrowthinIcon.vue'


const router = useRouter()


const goToCategory = (name) => {
  router.push({ name: 'Shop', params: { category: name } })
}
</script>

<template>
  <div class="advert-banner" :style="{ backgroundImage: `url(${branding})` }">
    <div class="inn-container">
      <h5>Exclusive offers <span>10% off</span></h5>
      <h1><span>Get amazing branding deals at low cost</span></h1>
      <p>Get one amazing branding at low cost</p>
      <p>from <span>Ksh 1000</span></p> 
      <button class="btn-advert" @click="goToCategory('branding')">Shop Now <ArrowThinIcon class="arrow-thin-icon"/></button>
    </div>
  </div>
</template>

<style>
@import '@/style/banner.css';
</style>