<template>
    <div>
      <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="form-container">
      <div class="form-wrapper">
        <div class="form-group">
          <label for="Name">Project Name:</label>
          <input
            v-model="Name"
            type="text"
            class="form-g-input"
            placeholder="logo design"
            id="Name"
          />
        </div>
        <div class="form-group">
          <label for="ProjectImage">Project Image:</label>
          <input
            @change="handleProjectImage"
            type="file"
            class="form-g-input"
            id="ProjectImage"
            accept="image/*"
          />
        </div>
        <div class="form-group">
          <label for="Name">Project Description:</label>
          <textarea
            v-model="ProjectDescription"
            type="text"
            class="form-g-input"
            placeholder="logo design is done by AI"
            id="ProjectDescription"
          />
        </div>
        <button type="submit" class="btn-f-f">Submit</button>
      </div>
    </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['formSubmitProject'])

const Name = ref('')
const ProjectImage = ref(null);
const ProjectDescription = ref('')


function handleFileUpload(event, targetRef) {
  const file = event.target.files[0]
  if (file) {
    targetRef.value = file
  }
}

function handleProjectImage(event) {
  handleFileUpload(event, ProjectImage)
}


function handleSubmit() {
  try {
    const formData = {
      title: Name.value,
      image : ProjectImage.value,
      description: ProjectDescription.value,
    }

    emit('formSubmitProject', formData)
  } catch (err) {
    console.log(err)
  }
}
</script>

<style>
@import '@/style/games.css';
</style>
