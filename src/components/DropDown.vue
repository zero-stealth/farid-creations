<template>
  <div class="drop-container" @click="toggleDropDown">
    <div class="drop-down">
      <span>{{ label }}</span>
      <ArrowIcon class="drop-icon" />
    </div>
    <div class="drop-down-panel" :class="DropDownStore.isOpen ? 'show' : 'hide'">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import ArrowIcon from '@/icons/arrowIcon.vue'
import { useDropDownStore } from '@/stores/dropdown'

const DropDownStore = useDropDownStore()

const toggleDropDown = () => {
  DropDownStore.toggleDropdrown()
}

defineProps(['label'])
</script>

<style scoped>
@import '@/style/dropdown.css';
</style>
