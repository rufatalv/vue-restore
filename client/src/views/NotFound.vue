<template>
  <div class="container">
    <h1 class="text-4xl font-bold text-center mt-10">Not Found</h1>
    <div class="text-center mt-4">
      <v-button class="text-white hover:underline" @click="() => router.back()">Go back</v-button>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router';

const router = useRouter()


</script>

<style scoped>
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
}
</style>
