<script setup>
import { useRouter } from 'vue-router'
import design from '@/assets/design.jpg'
import social from '@/assets/social.png'
import { ref, onMounted, watch } from 'vue'
import ArrowIcon from '@/icons/ArrowIcon.vue'
import branding from '@/assets/branding.png'
import printing from '@/assets/printing.jpg'
import notebooks from '@/assets/notebooks.jpg'
import ArrowThinIcon  from '@/icons/arrowthinIcon.vue'


const router = useRouter()

const slides = ref([
  {
    slide: branding,
    offers: '12%',
    link: 'Branding',
    title: 'Get one amazing branding at low cost',
    info: "only this week, Don't miss",
    price: '1000'
  },
  {
    slide: design,
    offers: '10%',
    link: 'Design',
    title: 'Get one amazing design at low cost',
    info: "only this week, Don't miss",
    price: '100'
  },
  {
    slide: printing,
    offers: '10%',
    link: 'Printing',
    title: 'Get one amazing printing at low cost',
    info: "only this week, Don't miss",
    price: '100'
  },
  {
    slide: social,
    offers: '10%',
    link: 'Social',
    title: 'Let us manage your social media presence',
    info: 'at an exclusive offer',
    price: '1000'
  },
  {
    slide: notebooks,
    offers: '10%',
    link: 'Notebooks',
    title: 'Get Notebooks & Diaries for exclusive prices',
    info: 'amazing deals',
    price: '1000'

  }
])

const currentSlide = ref(0)

function slide() {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
}

onMounted(() => {
  startSlideTimer()
})

watch(currentSlide, () => {
  stopSlideTimer()
  startSlideTimer()
})

const slideInterval = 5000
let slideTimer = null

function startSlideTimer() {
  slideTimer = setInterval(slide, slideInterval)
}

function stopSlideTimer() {
  clearInterval(slideTimer)
}

const goToCategory = (name) => {
  router.push({ name: 'Shop', params: { category: name } })
}
</script>

<template>
  <div class="advert-banner" :style="{ backgroundImage: `url(${slides[currentSlide].slide})` }">
    <button class="btn-ad start-btn" @click="prevSlide"><ArrowIcon class="icon-btn" /></button>
    <div v-for="(slide, index) in slides" :key="index" class="inn-container">
      <h5>Exclusive offers <span>{{ slides[currentSlide].offers }} off</span></h5>
      <h1>Exclusive offers <span>{{ slides[currentSlide].title }}</span></h1>
      <p>{{ slides[currentSlide].info }}</p>
      <p>from <span>Ksh {{ slides[currentSlide].price }}</span></p> 
      <button class="btn-advert" @click="goToCategory(slides[currentSlide].link)">Shop Now <ArrowThinIcon class="arrow-thin-icon"/></button>
    </div>
    <button class="btn-ad last-btn" @click="nextSlide"><ArrowIcon class="icon-btn" /></button>
  </div>
</template>
<style scoped>
@import '@/style/banner.css';
</style>
