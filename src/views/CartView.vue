<script setup>
import axios from 'axios'
import addIcon from '@/icons/AddIcon.vue'
import minusIcon from '@/icons/minusIcon.vue'
import deleteIcon from '@/icons/DeleteIcon.vue'
import CheckOut from '@/components/CheckOut.vue'
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
const toast = useToast()

const quantity = ref(1)
const cartData = ref([])
const serverHost = import.meta.env.VITE_SERVER_HOST
const customerId = ref(localStorage.getItem('customerId') || '')

const getCartData = async (id) => {
  try {
    const response = await axios.get(`${serverHost}/cart/items/${id}`)
    cartData.value = response.data
  } catch (err) {
    console.error(err)
  }
}

const updateCartData = async (id) => {
  if (quantity.value > 0) {
    try {
      const formData = new FormData()
      formData.append('quantity', quantity.value)

      const response = await axios.post(`${serverHost}/cart/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      await getCartData(customerId.value)
    } catch (err) {
      // alert(err.response.data.error);
      toast.error(err.response.data.error)
    }
  } else {
    toast.error('Quantity must be greater than 0')
  }
}

const deleteCart = async (id) => {
  try {
    const response = await axios.delete(`${serverHost}/cart/delete/${id}`, {})
    await getCartData(customerId.value)
    // alert(response.data.message)
    toast.info(response.data.message)
  } catch (err) {
    // alert(err.response.data.message);
    toast.error('An error occured')
    console.log(err)
  }
}

const total = computed(() => {
  return cartData.value.reduce((acc, product) => {
    const productPrice = parseFloat(product.price) || 0
    const productQuantity = product.quantity || 1

    return acc + productPrice * productQuantity
  }, 0)
})

const delivery = computed(() => {
  return 30 * 1
})

const Add = (id) => {
  quantity.value++
  updateCartData(id)
}

const Minus = (id) => {
  if (quantity.value > 1) {
    quantity.value--
    updateCartData(id)
  } else {
    quantity.value = 1
    updateCartData(id)
  }
}

onMounted(() => {
  getCartData(customerId.value)
})
</script>
<template>
  <div class="cart-contain" v-if="cartData.length > 0">
    <div class="cart-wrapper">
      <div class="cart-layout" v-for="data in cartData" :key="data._id">
        <div class="cart-lay1" :style="{ backgroundImage: `url(${data.productImage})` }">
          <!-- product image -->
        </div>
        <div class="cart-lay2">
          <div class="cart-h">
            <h1>{{ data.name }}</h1>
          </div>
          <div class="sideline">
            <div class="cart-price">
              <h4>Price:</h4>
              <span>Ksh {{ data.price }}</span>
            </div>
            <div class="cart-no">
              <div class="inc-contain">
                <div class="cart-in" @click="Add(data._id)">
                  <addIcon class="icon-add" />
                </div>
                <div class="quantity">
                  {{ quantity }}
                </div>
                <div class="cart-in" @click="Minus(data._id)">
                  <minusIcon class="icon-minus" />
                </div>
              </div>
              <deleteIcon class="icon-delete" @click="deleteCart(data._id)" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <CheckOut :subtotal="total" :delivery="delivery" />
  </div>
  <div class="cart-contain no-data" v-else>
    <h1>cart empty</h1>
  </div>
</template>
<style>
@import '@/style/cart.css';
</style>
