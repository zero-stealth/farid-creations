<script setup>
import { computed } from 'vue'

const props = defineProps(['type', 'Id', 'title', 'price', 'Image']);

const random = Math.floor(Math.random() * 1000);

const totalPrice = computed(() => parseFloat(props.price) + random);

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
        <span>Ksh {{ totalPrice }}</span>
        Ksh {{ props.price }}
      </p>
    </div>
  </div>
</template> 

<style scoped>
@import '@/style/card.css';
</style>
