<template>
  <div class="border flex flex-col border-slate-200 rounded-xl shadow-md p-4 fadein animation-duration-500">
    <div class="surface-card mb-4 w-full text-center p-5">
      <img :src="item.image" alt="Watch" class="h-48 mx-auto object-contain" />
    </div>
    <div class="flex  h-full flex-col mb-4">
      <div class="flex items-center my-2">
        <div class="flex flex-col  overflow-hidden">
          <p class="block font-semibold mb-1 ">{{ props.item.title }}</p>
          <span class="text-secondary text-sm">{{ props.item.category }}</span>

        </div>
        <span class="font-medium text-xl ml-auto">${{ props.item.price }}</span>
      </div>
      <p class="m-0 mt-auto  line-clamp-3">
        {{ props.item.description }}
      </p>
    </div>
    <VButton label="Add to Cart" @click="props.click" icon="pi pi-shopping-cart" outlined class="w-full py-4"></VButton>
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object,
  click: Function
})
</script>