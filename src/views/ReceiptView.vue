<template>
  <div ref="document" class="pdf-wrapper">
    <div class="pdf-container" id="pdf-area">
      <div class="pdf-header">
        <img src="@/assets/logo.jpeg" alt="farid-logo" class="pdf-logo" />
        <div class="pdf-header-info">
          <h1>FARID CREATION</h1>
        </div>
        <div class="pdf-details">
          <div class="inner-pdf-details">
            <!-- Receipt Details -->
            <div class="pdf-tbl-d" v-for="(item, index) in data" :key="index">
              <div class="table-pdf-header">
                <div>{{ item.name }}</div>
                <div v-if="item.marks">Marks: {{ item.marks }}</div>
              </div>
              <div class="pdf-table-column">
                <div>{{ item.value }}</div>
              </div>
            </div>
            <!-- Date and Sign -->
            <div class="pdf-tbl-d">
              <div class="table-pdf-header">
                <div>Date</div>
                <div>Sign</div>
              </div>
              <div class="pdf-table-column">
                <div>{{ getCurrentDate() }}</div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pdf-footer assessor-header">
        <h1 class="">MPESA RECEIPT FROM FARID CREATION</h1>
        <h5>P.O.Box 000 Kenya.</h5>
        <h5>Email: faridcreations@gmail.com,</h5>
      </div>
    </div>
    <div class="pdf-btn">
      <button class="btn1 btn1-b" @click="generatePdf">Download</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import html2pdf from 'html2pdf.js'

const getCurrentDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const paidProducts = JSON.parse(localStorage.getItem('paidProducts')) || [];
const totalPaidAmount = localStorage.getItem('totalPaidAmount') || 0;

const data = ref([
  ...paidProducts.map(product => ({ name: product.name, value: `Ksh ${product.price}` })),
  { name: 'Total Paid Amount', value: `Ksh ${totalPaidAmount}` }
]);

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
