<script setup>
import {ref} from 'vue'

const title = ref('')
const price = ref(0)
const description = ref('')
const image = ref(null)

const onFileChange = (e) => {
  const file = e.target.files[0]
  image.value = file
}

const onSubmit = () => {
  const formData = new FormData()
  formData.append('name', name.value)
  formData.append('price', price.value)
  formData.append('description', description.value)
  formData.append('image', image.value)

  console.log(formData)

}
</script>

<template>
  <div class="container mt-10">
    <VCard>
      <template #title>Simple Card</template>
      <template #content>
        <h1>Add Product</h1>
        <form class="my-4 flex flex-col gap-4" enctype="multipart/form-data" @submit="onSubmit">
          <div class="flex flex-col gap-2">
            <label for="title">Title</label>
            <VInputText id="title" v-model="title" aria-describedby="title-help"/>
            <small id="title-help">Enter your username to reset your password.</small>
          </div>
          <div class="flex flex-col gap-2">
            <label for="username">Username</label>
            <VInputText id="username" v-model="name" aria-describedby="username-help"/>
            <small id="username-help">Enter your username to reset your password.</small>
          </div>
          <v-button type="submit">Add Product</v-button>
        </form>
      </template>
    </VCard>
  </div>
</template>

<style scoped>

</style>