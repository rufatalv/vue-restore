<script setup>
import {ref} from 'vue'
import { useToast } from "primevue/usetoast";
const toast = useToast();
const title = ref('')
const price = ref(0)
const description = ref('')
const image = ref(null)
const body = ref('')

const fileupload = ref();

const upload = () => {
  fileupload.value.upload();
};

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
          </div>
          <div class="flex flex-col gap-2">
            <label for="body">Body</label>
            <quill-editor content-type="html" v-model:content="body" theme="snow"></quill-editor>
          </div>
          <div class="flex flex-col">
            <VFileUpload ref="fileupload" mode="advanced" name="file" url="/api/upload" accept="image/*" :maxFileSize="1000000" />
          </div>
          <v-button type="submit">Add Product</v-button>
        </form>
      </template>
    </VCard>
  </div>
</template>

<style scoped>

</style>