<template>
  <div class="service">
    <div class="selected-service">
      <div v-if="selectedService">
        <img :src="selectedService.image" :alt="selectedService.name" class="service-img-i" />
      </div>
      <div v-else>
        <img :src="defaultImage" alt="Default Service" class="service-img-i" />
      </div>
    </div>
    <div class="service-list">
      <div
        v-for="serviceItem in services"
        :key="serviceItem.name"
        class="service-item"
        :class="{
          'selected-service-b': selectedService && selectedService.name === serviceItem.name
        }"
        @click="selectService(serviceItem)"
      >
        <h2
          :class="{
            'selected-service-name': selectedService && selectedService.name === serviceItem.name
          }"
        >
          {{ serviceItem.name }}
        </h2>
        <p>{{ serviceItem.description }}</p>
        <button class="btn-services-n" @click=goTo(serviceItem.name)>
          View  more
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

import branding from '../assets/branding.png'
import design from '../assets/design.jpg'
import marketing from '../assets/marketing.jpg'
import printing from '../assets/printing.jpg'
import { useRouter } from 'vue-router'

const router = useRouter()


const services = [
  {
    name: '01 Graphic Design',
    description:
      'Farid Creations has been in the industry long enough to master the different aspects of graphic design and has a 10-year work portfolio to show for it.',
    image: design
  },
  {
    name: '02 Printing',
    description:
      'Farid Creations is well equipped with high-quality printers, plotters, and large format printers that guarantee a clean and professional experience.',
    image: printing
  },
  {
    name: '03 Branding',
    description:
      'From company creation to launching, Farid Creations are with you all through providing a seamless experience in all branding fields.',
    image: branding
  },
  {
    name: '04 Social Media Management',
    description:
      "We help you to grow your social media presence with our social media management services.",
    image: marketing
  },
]

const selectedService = ref({
  name: '01 Graphic Design',
  description:
    'Farid Creations has been in the industry long enough to master the different aspects of graphic design and has a 10-year work portfolio to show for it.',
  image: design
})
const defaultImage = branding

function selectService(service) {
  selectedService.value = service
}

const goTo = (serviceName) => {
  switch (serviceName) {
    case '01 Graphic Design':
      router.push({ name: 'Graphic' });
      break;
    case '02 Printing':
      router.push({ name: 'Printing' });
      break;
    case '03 Branding':
      router.push({ name: 'Branding' });
      break;
    case '04 Social Media Management':
      router.push({ name: 'Social' });
      break;
    default:
      break;
  }
}

</script>

<style scoped>
@import '@/style/service.css';
</style>
