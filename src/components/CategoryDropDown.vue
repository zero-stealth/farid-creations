<template>
  <div class="drop-container" @click="toggleCategory">
    <div class="drop-down">
      <FilterIcon class="drop-f-icon" />
      <span>{{ label }}</span>
      <ArrowIcon class="drop-icon" />
    </div>
    <div class="drop-down-panel" :class="DropDownStore.isCategoryOpen ? 'show' : 'hide'">
      <slot></slot>
    </div>
    <div class="footer-category">
    <span> Quality products</span> 
    </div>
  </div>
</template>

<script setup>
import FilterIcon from '@/icons/filterIcon.vue'
import ArrowIcon from '@/icons/arrowIcon.vue'
import { useDropDownStore } from '@/stores/dropdown'

const DropDownStore = useDropDownStore()

const toggleCategory = () => {
  DropDownStore.toggleCategory()
}

defineProps(['label'])
</script>

<style scoped>
@import '@/style/category.css';
</style>
