<template>
  <div ref="document" class="pdf-wrapper">
    <div class="pdf-btn">
      <button class="btn1" @click="generatePdf">Download receipt</button>
    </div>
    <div class="pdf-container" id="pdf-area">
      <div class="pdf-header">
        <div class="top-header">
          <span>Order: {{ customerId }}</span>
          <span>{{ getCurrentDate() }}</span>
        </div>
        <div class="inner-header">
          <img src="@/assets/logo.jpeg" alt="farid-logo" class="pdf-logo" />
          <div class="pdf-header-info">
            <h1>MPESA RECEIPT FROM FARID CREATION</h1>
          </div>
        </div>
      </div>
      <div class="pdf-details">
        <div class="inner-pdf-details">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody v-if="ProductData.length === 0">
              <tr>
                <td colspan="4">No Product paid for</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr v-for="(item, index) in ProductData" :key="index">
                <td>
                  <div class="pdf-tbl-img">
                    <img :src="item.image" alt="pdf-p" class="pdf-pi" />
                  </div>
                </td>
                <td>
                  <span>{{ item.name }}</span>
                </td>
                <td>
                  <span>Ksh {{ item.price }}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="total">
            <h1>Total(Ksh)</h1>
            <span>{{ totalPaidAmount }}</span>
          </div>
        </div>
      </div>
      <div class="pdf-footer">
        <h5>P.O.Box 000 Kenya</h5>
        <h5>Contact: +254712677018</h5>
        <h5>Email: faridcreations@gmail.com</h5>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import html2pdf from 'html2pdf.js'

const getCurrentDate = () => {
  const date = new Date()
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

const customerId = localStorage.getItem('customerId')

const paidProducts = JSON.parse(localStorage.getItem('paidProducts')) || []
const totalPaidAmount = localStorage.getItem('totalPaidAmount') || 0

const ProductData = ref(
  paidProducts.map((product) => ({
    name: product.name,
    product: product.product,
    price: product.price,
    image: product.image
  }))
)

const generatePdf = () => {
  html2pdf(document.getElementById('pdf-area'), {
    margin: 1,
    filename: 'payment-receipt.pdf'
  })
}

</script>

<style>
@import '@/style/pdf.css';
</style>
