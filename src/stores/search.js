import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {
  const searchParam = ref(null)
  function updateSearchParam(term) {
    searchParam.value = term;
  }

  return { searchParam, updateSearchParam }
})
