<script setup>
import {ref} from 'vue'
import UILoader from "@/components/UILoader.vue";
import axios from "axios";
import {useUser} from "@/store/store.js";

const user = useUser()
const loading = ref(true)
const title = ref('')
const price = ref(0)
const description = ref('')
const category = ref()
const categories = ref([])
const body = ref('')

const fetchCategories = () => {
  axios.get(import.meta.env.VITE_API_URL + '/api/category')
      .then(res => {
        console.log(res.data)
        loading.value = false
        categories.value = res.data;
      })
      .catch(err => {
        console.error(err)
        loading.value = false
      })
}
fetchCategories()
const fileupload = ref();


const onSubmit = async (e) => {
  e.preventDefault()
  const data = {
    title: title.value,
    description: description.value,
    body: body.value,
    price: price.value,
    image: fileupload.value.files[0],
    category: category.value._id
  }
  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key]);
  }

  console.log(data)

  const res = await axios.post(import.meta.env.VITE_API_URL + '/api/products/add-product', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + user.user?.token
    }
  })
  console.log(res)
}
</script>

<template>
  <div class="container mt-10">
    <div v-if="loading">
      <UILoader/>
    </div>
    <div v-else>
      <VCard>
        <template #title>Simple Card</template>
        <template #content>
          <h1>Add Product</h1>
          <form class="my-4 flex flex-col gap-4" enctype="multipart/form-data" @submit="onSubmit">
            <div class="flex flex-col gap-2">
              <label for="title">Title</label>
              <VInputText id="title" v-model="title" aria-describedby="title-help"/>
            </div>
            <div class="flex flex-col gap-2">
              <label for="body">Body</label>
              <quill-editor v-model:content="body" content-type="html" theme="snow"></quill-editor>
            </div>
            <div class="flex flex-col gap-2">
              <label for="body">Description</label>
              <quill-editor v-model:content="description" content-type="html" theme="snow"></quill-editor>
            </div>
            <div class="flex flex-col gap-2">
              <label for="body">Price</label>
              <VInputText id="price" v-model="price" aria-describedby="price-help" type="number"/>
            </div>
            <div class="flex flex-col gap-2">
              <label for="body">Category</label>
              <VSelect v-model="category" :options="categories" class="w-full md:w-56" optionLabel="name"
                       placeholder="Select a category">
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex items-center">
                    <div>{{ slotProps.value.name }}</div>
                  </div>
                  <span v-else>
                  {{ slotProps.placeholder }}
                </span>
                </template>
                <template #option="slotProps">
                  <div class="flex items-center">
                    <div>{{ slotProps.option.name }}</div>
                  </div>
                </template>
              </VSelect>
            </div>
            <div class="flex flex-col gap-2">
              <label for="fileupload">Image</label>

              <VFileUpload ref="fileupload" :maxFileSize="1000000"
                           :pt="{root: 'flex-nowrap w-full mr-auto justify-start'}" accept="image/*"
                           class="flex-nowrap flex flex-row" mode="basic"
                           name="file"
              />
            </div>
            <v-button type="submit">Add Product</v-button>
          </form>
        </template>
      </VCard>
    </div>
  </div>
</template>

<style scoped>

</style>