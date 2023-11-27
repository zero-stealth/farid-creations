import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDropDownStore = defineStore('DropDown', () => {
  const isOpen = ref(false)
  const isCategoryOpen = ref(false)
  function toggleDropdrown() {
    isOpen.value = !isOpen.value;
  }

  function toggleCategory() {
    isCategoryOpen.value = !isCategoryOpen.value;
  }


  return { isOpen, isCategoryOpen, toggleCategory, toggleDropdrown }
})
