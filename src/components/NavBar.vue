<script setup>
import axios from 'axios'
import Logo from '@/assets/logo.jpeg'
import { ref, onMounted } from 'vue'
import CartIcon from '@/icons/cartIcon.vue'
import SearchIcon from '@/icons/searchIcon.vue'
import ProfileIcon from '@/icons/profileIcon.vue'
import DropDown from '@/components/DropDown.vue'
import { useSearchStore } from '@/stores/search'
import { RouterLink, useRouter } from 'vue-router'
import CategoryDropDown from '@/components/CategoryDropDown.vue'

const cartData = ref([])
const isAuth = ref(false)
const searchTerm = ref('')
const router = useRouter()
const searchStore = useSearchStore()
const email = ref(localStorage.getItem('email'))
const serverHost = import.meta.env.VITE_SERVER_HOST
const customerId = ref(localStorage.getItem('customerId') || '')



const getCartData = async (id) => {
  try {
    const response = await axios.get(`${serverHost}/cart/${id}`)
    cartData.value = response.data
  } catch (err) {
    console.error(err)
  }
}

const getUserName = (email) => {
  if (email && isAuth) {
    const username = email.split('@')[0];
    return username;
  } else {
    return 'Guest';
  }
};

const goToCategory = (name) => {
  router.push({ name: 'Shop', params: { category: name } })
}

const filterBy = (fiter) => {
  searchStore.updateSearchParam(fiter)
}

const goSignin = () => {
  router.push({ name: 'Login' })
}

const goCart = () => {
  router.push({ name: 'Cart' })
}

onMounted(() => {
  getCartData(customerId.value)
})
</script>

<template>
  <div class="nav-component">
    <div class="top-nav">
      <p>100% secure delivery guranteed</p>
      <p>Need help? Call us <span>+254712677018</span></p>
    </div>
    <div class="middle-nav">
      <div class="categories-container">
        <img :src="Logo" alt="logo" class="logo" />
        <div class="middle-nav-categories">
          <CategoryDropDown label="All categories">
            <span @click="filterBy('Design')">Graphic Design</span>
            <span @click="filterBy('Printing')">Printing</span>
            <span @click="filterBy('Branding')">Branding</span>
            <span @click="filterBy('Social')">Social Media Management</span>
            <span @click="filterBy('Notebooks')">Notebooks & Diaries</span>
          </CategoryDropDown>
        </div>
      </div>
      <div class="middle-in-nav">
        <div class="search-nav">
          <input
            type="text"
            v-model="searchTerm"
            placeholder="search for product"
            class="search-nav-input"
          />
          <SearchIcon class="search-icon" />
        </div>
        <div class="side-nav">
          <div class="nav-profile-info">
            <div class="cart-circle" @click="goSignin()">
              <ProfileIcon class="nav-p" />
            </div>
            <h1 v-if="isAuth">{{ getUserName(email) }}</h1>
          </div>
          <div class="cart-circle" @click="goCart()">
            <span>{{ cartData.length }}</span>
            <CartIcon class="nav-cart" />
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-nav">
      <CategoryDropDown label="All categories" class="category-bottom-nav">
        <span @click="filterBy('Design')">Graphic Design</span>
        <span @click="filterBy('Printing')">Printing</span>
        <span @click="filterBy('Branding')">Branding</span>
        <span @click="filterBy('Social')">Social Media Management</span>
        <span @click="filterBy('Notebooks')">Notebooks & Diaries</span>
      </CategoryDropDown>
      <div class="bottom-part">
        <RouterLink :to="{ name: 'Home' }" class="nav-link">Home</RouterLink>
        <RouterLink :to="{ name: 'About' }" class="nav-link">About</RouterLink>
        <DropDown label="Shop">
          <span @click="goToCategory('Design')">Graphic Design</span>
          <span @click="goToCategory('Printing')">Printing</span>
          <span @click="goToCategory('Branding')">Branding</span>
          <span @click="goToCategory('Social')">Social Media Management</span>
          <span @click="goToCategory('Notebooks')">Notebooks & Diaries</span>
        </DropDown>
        <RouterLink :to="{ name: 'Portfolio' }" class="nav-link">Portfolio</RouterLink>
        <a href="#contact" class="nav-link">Contact</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/style/nav.css';
</style>
