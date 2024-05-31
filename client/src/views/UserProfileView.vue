<template>
  <div class="container mt-10">
    <div class="flex flex-col gap-4">
      <h1 class="text-2xl font-bold">User Profile</h1>
      <div v-if="isLoading" class="min-h-[500px]">
        <UILoader/>
      </div>
      <div v-else>
        <VCard>
          <template #content>
            <VDataView :pt="{
      content: '[&>.grid]:divide-y [&>.grid]:divide-y-zinc-900'
    }" :value="likedProducts">
              <template #list="slotProps">
                <div class="grid">
                  <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
                    <div :class="{ 'border-top-1 border-zinc-500': index !== 0 }"
                         class="flex  flex-col sm:flex-row sm:items-center p-4 gap-3">
                      <div class="md:w-10rem relative">
                        <img :alt="item.name"
                             :src="item.image"
                             class="block xl:block w-24 h-24 object-contain mx-auto border-round "/>
                        <VTag class="absolute" style="left: 4px; top: 4px"
                              value="STOCK"></VTag>
                      </div>
                      <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-4">
                        <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                          <div>
                            <span class="font-medium text-secondary text-sm">{{ item.category.toUpperCase() }}</span>
                            <div class="text-lg font-medium text-900 mt-2">{{ item.title }}</div>
                          </div>
                          <div class="surface-100 p-1" style="border-radius: 30px">
                            <span class="text-900 font-medium text-sm">{{ item.rating }}</span>
                            <i class="pi pi-star-fill text-yellow-500"></i>
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-col md:items-end gap-5">
                        <span class="text-xl font-semibold text-900">${{ item.price }}</span>
                        <div class="flex items-center flex-row gap-2">
                          <VButton :pt="{
                        root: 'px-3 py-2 w-fit',
                        icon: 'text-xs'
                      }" icon="pi pi-shopping-cart" label="Add To Cart" outlined></VButton>
                          <VButton :pt="{
                        root: 'px-3 py-2 w-fit',
                        icon: 'text-xs'
                      }" icon="pi pi-heart-fill" label="In Favorites" outlined></VButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </VDataView>
          </template>
        </VCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import UILoader from "@/components/UILoader.vue";
import {toast} from "@steveyuowo/vue-hot-toast";
const userInfo = ref(null)
const likedProducts = ref([])
const isLoading = ref(true)

const getUserInfo = async () => {
  const res = await axios.get(import.meta.env.VITE_API_URL + '/api/users/user');
  if(res.status === 200){
    isLoading.value = false;
  } else{
    isLoading.value = false;
    toast.error("An error occurred while fetching user information")
  }
  const data = res.data;
  console.log(data)
  likedProducts.value = data.likedProducts;
  userInfo.value = data;
}
getUserInfo()
</script>