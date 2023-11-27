<script setup>
import { ref, watchEffect } from "vue";
import Design from "@/assets/design.jpg";
import Social from "@/assets/social.jpg";
import Branding from "@/assets/branding.jpg";
import Printing from "@/assets/printing.jpg";
import Notebooks from "@/assets/notebooks.jpg";

const props = defineProps(["imageName"]);
const image = ref('');

watchEffect(() => {
  switch (props.imageName) {
    case "Design":
      image.value = Design;
      break;
    case "Social":
      image.value = Social;
      break;
    case "Branding":
      image.value = Branding;
      break;
    case "Printing":
      image.value = Printing;
      break;
    case "Notebooks":
      image.value = Notebooks;
      break;
    default:
      break;
  }
});
</script>

<template>
  <div class="home-panel" :style="{ backgroundImage: `url(${image})` }">
    <slot></slot>
  </div>
</template>

<style>
@import "@/style/Imgpanel.css";
</style>
