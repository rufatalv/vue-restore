<template>
  <div>
    <div v-if="isLoading" class="min-h-[500px]">
      <UILoader/>
    </div>
    <div
        v-else
        v-motion
        :enter="{
        opacity: 1,
        transition: {
          delay: 200
        }
      }"
        :initial="{ opacity: 0 }"
        :leave="{
        opacity: 0,
        transition: {
          delay: 200
        }
      }"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container my-10 gap-4">
        <UICard v-for="item in items" :key="item.id" :item="item" @click="addToCart(item)"/>
      </div>
    </div>
  </div>
</template>


<script setup>
import {ref} from 'vue'
import axios from 'axios'
import {useCart} from '@/store/store.js'
import UICard from '@/components/UICard.vue'
import UILoader from "@/components/UILoader.vue";

const items = ref([])
const store = useCart()
const isLoading = ref(true)

const fetchData = async () => {

  const response = await axios.get(import.meta.env.VITE_API_URL + '/api/products')
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
