<template>
  <div class="package-container">
    <div class="package-header">
      <h1>Social Media Marketing Packages and Cost in Kenya</h1>
      <p>
        At Farid Creations, we are your premier partner in Kenya for unparalleled social media
        marketing services. We specialize in crafting custom strategies, leveraging local insights,
        and data-driven decisions to boost your online presence and help your business thrive. With
        us, your success is not just a goal; it's our commitment. Let's make your brand stand out in
        the digital world!
      </p>
    </div>
    <div class="package-card-container">
      <div
        v-for="d in data"
        :key="d.title"
        class="package-card"
        @click="getPackage(d.title, d.info, d.price)"
      >
        <h1>{{ d.title }}</h1>
        <h4>{{ d.info }}</h4>
          <li>{{ d.offer01 }}</li>
          <li>{{ d.offer02 }}</li>
          <li>{{ d.offer03 }}</li>
          <span> Ksh <br/> {{ d.price }} </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const phoneNumber = ref('254712677018')

const getPackage = (title, info, price) => {
  window.open(
    `https://wa.me/${phoneNumber.value}?text=
Hi Farid Creations,

I am interested in the social media marketing ${title} package:
- Package: ${title}
- Description: ${info}
- Price: ${price}

`,
    '_blank'
  )
}

const data = ref([
  {
    title: 'Basic',
    info: 'PERFECT FOR SMALL BUSINESSES LOOKING TO GROW ONLINE PRESENCE.',
    offer01: '1 Social Media Platform (FB or IG)',
    offer02: '8 Branded posts per Month 1 Post boost',
    offer03: 'Monthly Report & Analysis',
    price: '20,000'
  },
  {
    title: 'STANDARD',
    info: 'MID-TO LARGE BUSINESS WITH SEVERAL TARGET LOCATIONS.',
    offer01: '2 Social Media Platforms (FB & IG)',
    offer02: '16 Branded posts per Month',
    offer03: '2 Post boost',
    offer04: 'Social Media platform optimization',
    offer05: 'Page Monitoring & Responding',
    offer06: 'Monthly Report & Analysis',
    price: '35,000'
  },
  {
    title: 'PREMIUM',
    info: 'ENTERPRISE LEVEL CLIENTS WITH ECOMMERCE SOLUTIONS',
    offer01: '3 Social Media Platforms',
    offer02: '30 Branded posts per Month',
    offer03: '6 Post boost',
    offer04: 'A dedicated Social Media Manager to oversee your online campaign',
    offer05: 'Page Monitoring & Responding',
    offer06: 'Monthly Report & Analysis',
    price: '85,000'
  }
])
</script>

<style scoped>
@import '@/style/package.css';
</style>
