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
        <UICard
            v-for="item in items"
            :key="item.id"
            :btnText="store.items.find((storeItem) => storeItem.id === item.id) ? 'Added to Cart' : 'Add to Cart'"
            :btnclick="() => addToCart(item)"
            :click-heart="() => handleAddToFavorites(item)"
            :item="item"
        />
      </div>
    </div>
  </div>
</template>


<script setup>
import {computed, ref} from 'vue'
import axios from 'axios'
import {useCart, useUser} from '@/store/store.js'
import UICard from '@/components/UICard.vue'
import UILoader from "@/components/UILoader.vue";
import {toast} from "@steveyuowo/vue-hot-toast";

const items = ref([])
const store = useCart()
const isLoading = ref(true)
const user = useUser()

const handleAddToFavorites = (item) => {
  let isExists = computed(() => {
    return user.user?.likedProducts.filter((product) => product._id === item._id).length > 0
  })
  if (isExists.value) {
    console.log(item)
    user.removeLikedProduct(item._id)
  } else {
    user.addLikedProduct(item._id)
  }
}

const fetchData = async () => {
  const response = await axios.get(import.meta.env.VITE_API_URL + '/api/products')
  items.value = response.data
  isLoading.value = false
}

const addToCart = (item) => {
  const toastCart = toast.loading("Loading...")

  const isExists = store.items.find((storeItem) => storeItem.id === item.id);
  if (isExists) {
    toast.update(toastCart, {
      type: "success",
      message: "Item removed from cart!"
    })

    store.removeItem(item.id)
  } else {
    toast.update(toastCart, {
      type: "success",
      message: "Item added to cart!"
    })
    store.addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      category: item.category
    })
  }

}
fetchData()
</script>
