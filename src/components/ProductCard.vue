<script setup>
import { computed } from 'vue'

const props = defineProps([ 'type', 'Id', 'title', 'price', 'Image'])

const random = Math.floor(Math.random() * 100)

const totalPrice = computed(() => props.price - random)

</script>
<template>
  <div class="card-container">
    <div class="card-h">
      <h2>{{ props.type }}</h2>
    </div>
    <div class="card-img-container" :style="{ backgroundImage: `url(${Image})` }"></div>
    <div class="card-info">
      <h4>{{ props.title }}</h4>
      <p>
        <span>Ksh {{ props.price }} </span>
        Ksh {{ totalPrice }}
      </p>
    </div>
  </div>
</template> 

<style scoped>
@import '@/style/card.css';
</style>
