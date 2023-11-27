<script setup>
import SocialPackage from '@/components/SocialPackage.vue';
import Service from '@/components/ServiceComponent.vue'
import experience from '@/assets/experience.jpg'
import platforms from '@/assets/platforms.jpg'
import customer from '@/assets/customer.png'
import delivery from '@/assets/delivery.png'

import { ref } from 'vue'

const data = ref([
  {
    id: 1,
    img: platforms,
    title: 'Social Media Management',
    description:
      'we help you to grow your social media presence with our social media management services.'
  },
  {
    id: 2,
    img: experience,
    title: 'Design-inspired Products for Sale',
    description:
      'Our offerings are more than just items; theyre expressions of creativity and innovation. Each product in our catalog is meticulously crafted to bring a touch of style to your everyday life.'
  },
  {
    id: 3,
    img: customer,
    title: '24/7 Support',
    description:
      'Our support staff is always ready to help you out. In case of any queries, you can call (+254)700.'
  },
  {
    id: 4,
    img: delivery,
    title: 'Delivery',
    description: 'We deliver countrywide when the delivery fee is paid.'
  }
])
</script>
<template>
    <Service />
  <SocialPackage/>
  <div class="about-main">
    <div class="about-card-wapper">
      <div class="about-card" v-for="d in data" :key="d.id">
        <img :src="d.img" :alt="d.title" class="about-img" />
        <div class="about-card-info">
          <h1>{{ d.title }}</h1>
          <p>{{ d.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import '@/style/about.css';
</style>
