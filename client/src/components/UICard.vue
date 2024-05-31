<template>
  <div class="border flex relative flex-col border-slate-200 rounded-xl shadow-md p-4 fadein animation-duration-500">
    <div class="surface-card mb-4 w-full text-center p-5">
      <img :src="item.image" alt="Watch" class="h-48 mx-auto object-contain"/>
    </div>
    <div v-if="user.user">
      <div class="absolute top-2 left-2">
        <VButton
            :icon="isExists ? 'pi pi-heart-fill' : 'pi pi-heart'"
            :pt="{
          root: 'px-2 py-2 w-fit',
          icon: 'text-md'
          }"
            outlined @click="props.clickHeart"/>
      </div>
    </div>
    <div class="flex  h-full flex-col mb-4">
      <div class="flex items-center my-2">
        <div class="flex flex-col  overflow-hidden">
          <p class="block font-semibold mb-1 ">{{ props.item.title }}</p>
          <span class="text-secondary text-sm">{{ props.item.category.name }}</span>

        </div>
        <span class="font-medium text-xl ml-auto">${{ props.item.price }}</span>
      </div>
      <p class="m-0 mt-auto  line-clamp-3" v-html="props.item.description">

      </p>
    </div>
    <VButton :label="props.btnText" class="w-full py-4" icon="pi pi-shopping-cart" outlined
             @click="props.btnclick"></VButton>
  </div>
</template>

<script setup>
import {useUser} from "@/store/store.js";
import {computed, ref} from "vue";

const props = defineProps({
  btnText: String,
  item: Object,
  btnclick: Function,
  clickHeart: Function
})
console.log(props.item)
const user = useUser()
let isExists = null
if (user.user) {
  isExists = computed(() => {
    return user.user.likedProducts.filter((product) => product._id === props.item._id).length > 0
  })
}


</script>