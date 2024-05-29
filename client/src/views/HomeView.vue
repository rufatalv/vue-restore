<template>
  <div>
    <div v-if="isLoading">
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{
          opacity: 1,
          transition: {
            delay: 200
          }
        }"
        :leave="{
          opacity: 0,
          transition: {
            delay: 200
          }
        }"
        class="container flex justify-center items-center mx-auto my-10 text-center"
      >
        <div
          style="
            width: 50px;
            height: 50px;
            border: 4px solid #f7f7f7;
            border-top: 4px solid #333;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          "
          class="!border-t-primary-500"
        ></div>
      </div>
    </div>
    <div
      v-else
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{
        opacity: 1,
        transition: {
          delay: 200
        }
      }"
      :leave="{
        opacity: 0,
        transition: {
          delay: 200
        }
      }"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container my-10 gap-4">
        <UICard :key="item.id" v-for="item in items" :item="item" @click="addToCart(item)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useCart } from '@/store/store.js'
import UICard from '@/components/UICard.vue'

const items = ref([])
const store = useCart()
const isLoading = ref(true)

const fetchData = async () => {
  const response = await axios.get('https://fakestoreapi.com/products')
  items.value = response.data
  isLoading.value = false
}

const addToCart = (item) => {
  store.addToCart({
    id: item.id,
    title: item.title,
    price: item.price,
    image: item.image,
    category: item.category
  })
}

fetchData()
</script>
