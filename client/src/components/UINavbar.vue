<!--suppress ALL -->
<!--<template>-->
<!--  <VMenubar-->
<!--    :model="items"-->
<!--    :pt="{-->
<!--      button: 'ml-auto',-->
<!--      end: 'hidden md:block'-->
<!--    }"-->
<!--  >-->
<!--    <template #start><h1 class="text-2xl font-bold">re:store</h1></template>-->
<!--    <template #item="{ item, props, hasSubmenu, root }">-->
<!--     -->
<!--    </template>-->
<!--    <template #end>-->
<!--      <div class="flex gap-4 items-center">-->
<!--        <div class="relative">-->
<!--          <VButton-->
<!--            v-ripple-->
<!--            :pt="{-->
<!--              root: 'bg-zinc-900 border-zinc-100 h-full px-6 py-3.5',-->
<!--              icon: 'text-white',-->
<!--              loadingIcon: 'text-white'-->
<!--            }"-->
<!--            icon="pi pi-shopping-bag"-->
<!--            loading-icon="pi pi-spinner pi-spin"-->
<!--            @click="() => cart.toggleCart()"-->
<!--          />-->
<!--          <VBadge-->
<!--            :value="cart.items.length"-->
<!--            class="bg-transparent text-white font-bold absolute bottom-0 left-0 scale-[0.9]"-->
<!--          />-->
<!--        </div>-->
<!--        <div v-if="!user.isLoggedIn">-->
<!--          <div class="relative h-full">-->
<!--            <RouterLink to="/auth/login">-->
<!--              <VButton-->
<!--                v-ripple-->
<!--                :pt="{-->
<!--                  root: 'bg-white border-zinc-400 h-full px-6 py-3',-->
<!--                  icon: 'text-zinc-500',-->
<!--                  loadingIcon: 'text-white'-->
<!--                }"-->
<!--                icon="pi pi-sign-in"-->
<!--                loading-icon="pi pi-spinner pi-spin"-->
<!--              />-->
<!--            </RouterLink>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div v-else>-->
<!--          <div class="relative flex items-center gap-4">-->
<!--            <span class="bg-zinc-900 px-6 py-3 rounded-lg text-white">{{-->
<!--              user.user.username-->
<!--            }}</span>-->
<!--            <VButton-->
<!--              v-ripple-->
<!--              :pt="{-->
<!--                label: 'text-zinc-900',-->
<!--                root: 'bg-white border-zinc-400 px-6 py-3',-->
<!--                icon: 'text-zinc-900',-->
<!--                loadingIcon: 'text-white'-->
<!--              }"-->
<!--              icon="pi pi-sign-out"-->
<!--              label="Logout"-->
<!--              loading-icon="pi pi-spinner pi-spin"-->
<!--              @click="() => user.logout()"-->
<!--            />-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </template>-->
<!--  </VMenubar>-->
<!--</template>-->
<template>
  <div class="border-b border-b-slate-200 py-4">
    <div class="container flex justify-between items-center">
      <h1 class="text-2xl text-primary-500 font-bold">re:<span class="text-zinc-900">store</span></h1>
      <div class="flex gap-4 mr-auto ml-8">
        <div v-for="item in items" class="flex ">
          <RouterLink active-class="!text-zinc-950" v-ripple :to="item.to" :class="'flex px-3 py-2 rounded-md transition-all text-zinc-500 duration-300 hover:bg-zinc-950/10 hover:text-zinc-700  items-center '">
            <span :class="item.icon"/>
            <span class="ml-3">{{ item.label }}</span>
          </RouterLink>
        </div>
      </div>
      <div class="relative mr-4 h-full">
        <VButton
            v-ripple
            :pt="{
              root: 'bg-zinc-900 border-zinc-100 h-full px-6 py-4',
              icon: 'text-white',
              loadingIcon: 'text-white'
            }"
            icon="pi pi-shopping-bag"
            loading-icon="pi pi-spinner pi-spin"
            @click="() => cart.toggleCart()"
        />
        <VBadge
            :value="cart.items.length"
            class="bg-transparent text-white font-bold absolute bottom-0 left-0 scale-[0.9]"
        />
      </div>
      <div v-if="!user.isLoggedIn">
        <div class="relative h-full">
          <RouterLink to="/auth/login">
            <VButton
                v-ripple
                :pt="{
                  root: 'bg-white border-zinc-400 h-full px-6 py-3',
                  icon: 'text-zinc-500',
                  loadingIcon: 'text-white'
                }"
                icon="pi pi-sign-in"
                loading-icon="pi pi-spinner pi-spin"
            />
          </RouterLink>
        </div>
      </div>
      <div v-else>
        <div class="relative flex items-center gap-4">
            <span class="bg-zinc-900 px-6 py-3 rounded-lg text-white">{{
                user.user.username
              }}</span>
          <VButton
              v-ripple
              :pt="{
                label: 'text-zinc-900',
                root: 'bg-white border-zinc-400 px-6 py-3',
                icon: 'text-zinc-900',
                loadingIcon: 'text-white'
              }"
              icon="pi pi-sign-out"
              label="Logout"
              loading-icon="pi pi-spinner pi-spin"
              @click="() => user.logout()"
          />
        </div>
      </div>

    </div>
  </div>

</template>
<script setup>
import {ref} from 'vue'
import {useCart, useUser} from '@/store/store.js'
import {useRoute} from "vue-router";

const route = useRoute()

console.log(route.path)
const cart = useCart()
const user = useUser()

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    to: '/'
  },
  {
    label: 'Products',
    icon: 'pi pi-star',
    to: '/products'
  },
  {
    label: 'Contact',
    icon: 'pi pi-envelope',
    badge: 3,
    to: '/contact'
  }
])
</script>
