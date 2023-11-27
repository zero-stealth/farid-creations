<template>
  <div>
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="form-container">
      <div class="form-wrapper">
        <div class="form-group">
          <label for="projectName">Project Name:</label>
          <input
            v-model="projectName"
            type="text"
            class="form-g-input"
            placeholder="logo design"
            id="projectName"
          />
        </div>
        <div class="form-group">
          <label for="projectImage">Project Image:</label>
          <input
            @change="handleprojectImage"
            type="file"
            class="form-g-input"
            id="projectImage"
            accept="image/*"
          />
        </div>
        <div class="form-group">
          <label for="projectName">Project Description:</label>
          <textarea
            v-model="projectDescription"
            type="text"
            class="form-g-input"
            placeholder="logo design done by Adobe"
            id="projectDescription"
          />
        </div>
        <button type="submit" class="btn-f-f">Post</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const projectName = ref('')
const projectImage = ref(null)
const projectDescription = ref('')
const serverHost = import.meta.env.VITE_SERVER_HOST


const reset = () => {
  projectName.value = ''
  projectImage.value = ''
  projectDescription.value = ''
}

function handleFileUpload(event, targetRef) {
  const file = event.target.files[0]
  if (file) {
    targetRef.value = file
  }
}

function handleprojectImage(event) {
  handleFileUpload(event, projectImage)
}


async function handleSubmit() {
  if (
    projectName.value.trim() !== '' &&
    projectImage.value !== null &&
    projectDescription.value.trim() !== ''
  ) {
    const user = JSON.parse(localStorage.getItem('token'))
    try {
      const formData = new FormData()
      formData.append('title', projectName.value)
      formData.append('image', projectImage.value)
      formData.append('description', projectDescription.value)

      const response = await axios.post(`${serverHost}/work/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user}`
        }
      })
      alert('project posted')
      reset()
    } catch (err) {
      console.error(err)
    }

  } else {
    alert('No empty fields allowed')
  }
}
</script>

<style>
@import '@/style/form.css';
</style>
