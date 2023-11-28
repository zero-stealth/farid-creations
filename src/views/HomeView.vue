<script setup>
import TopProductComponent from '@/components/TopProductComponent.vue';
import ProductComponent from '@/components/ProductComponent.vue';
import HeroSection from '../components/HeroSection.vue';
import Portfolio from '@/views/PortfolioView.vue';
import AboutView from '@/views/AboutView.vue';
</script>
<template>
  <!-- <HeroSection /> -->
  <TopProductComponent />
  <AboutView/>
  <ProductComponent />
  <Portfolio />
</template>
<style scoped>
@import '@/style/home.css';
</style>
