<script setup>
import TopProductComponent from '@/components/TopProductComponent.vue';
import ProductComponent from '@/components/ProductComponent.vue';
import AdverBanner from '@/components/AdverBanner.vue';
import Portfolio from '@/views/PortfolioView.vue';
import AboutView from '@/views/AboutView.vue';
</script>
<template>
  <AdverBanner />
  <TopProductComponent />
  <AboutView/>
  <ProductComponent />
  <Portfolio />
</template>
<style scoped>
@import '@/style/home.css';
</style>
