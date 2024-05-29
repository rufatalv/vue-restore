<script setup>
import {useCart} from "@/store/store.js";

const cart = useCart()


const incrementCount = (item) => {
  cart.addToCart(item, 1);
};

const decrementCount = (item) => {
  if (item.count > 1) {
    cart.addToCart(item, -1);
  }
};
</script>

<template>
  <div class="container mt-10">
    <div class="flex flex-col gap-4 border-b border-b-zinc-200 pb-3 mb-4">
      <h1 class="text-2xl font-semibold">Checkout</h1>
      <p class="text-lg opacity-70">Review your cart and proceed to checkout!</p>
    </div>
    <VDataView :pt="{
      content: '[&>.grid]:divide-y [&>.grid]:divide-y-zinc-900'
    }" :value="cart.items">
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
                      }" icon="pi pi-minus" outlined @click="decrementCount(item)"></VButton>
                  <span class="text-sm font-semibold text-900">{{ item.count }}</span>
                  <VButton :pt="{
                      root: 'px-3 py-2 w-fit',
                      icon: 'text-xs'
                      }" icon="pi pi-plus" outlined @click="incrementCount(item)"></VButton>
                  <VButton :pt="{
                        root: 'px-3 py-2 w-fit',
                        icon: 'text-xs'
                      }" icon="pi pi-heart" outlined></VButton>
                  <VButton :pt="{
                        root: 'px-3 py-2 w-fit',
                        icon: 'text-xs'
                      }" icon="pi pi-trash" outlined @click="() => cart.removeItem(item.id)"></VButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </VDataView>
    <div class="flex justify-between border-t border-t-zinc-200 items-center pt-4 mt-4 ml-4">
      <p class="font-bold text-xl">Total: ${{ cart.total.toFixed(2) }}</p>
      <router-link to="/checkout/final">
        <VButton label="Checkout"/>
      </router-link>
    </div>
  </div>
</template>

<style scoped>

</style>