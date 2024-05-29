<!--suppress ALL -->
<template>
  <VMenubar :model="items" :pt="{
    button: 'ml-auto'
  }">
    <template #start><h1 class="text-2xl font-bold">re:store</h1></template>
    <template #item="{ item, props, hasSubmenu, root }">
      <RouterLink v-ripple :to="item.to" class="flex align-items-center" v-bind="props.action">
        <span :class="item.icon"/>
        <span class="ml-2">{{ item.label }}</span>
        <VBadge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge"/>
        <span v-if="item.shortcut"
              class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{ item.shortcut }}</span>
        <i v-if="hasSubmenu"
           :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
      </RouterLink>
    </template>
    <template #end>
      <div class="flex gap-4 items-center">
        <div class="relative">
          <VButton v-ripple
                   :pt="{ root: 'bg-zinc-900 border-zinc-100 h-full px-6 py-3.5', icon: 'text-white', loadingIcon: 'text-white' }"
                   icon="pi pi-shopping-bag"
                   loading-icon="pi pi-spinner pi-spin" @click="() => cart.toggleCart()"/>
          <VBadge :value="cart.items.length"
                  class="bg-transparent text-white font-bold absolute bottom-0 left-0 scale-[0.9]"/>
        </div>
        <div v-if="!user.isLoggedIn">
          <div class="relative h-full">
            <RouterLink to="/auth/login">
              <VButton
                  v-ripple
                  :pt="{
            root: 'bg-white border-zinc-400 h-full px-6 py-3',
            icon: 'text-zinc-500',
            loadingIcon: 'text-white'}"
                  icon="pi pi-sign-in" loading-icon="pi pi-spinner pi-spin"/>
            </RouterLink>
          </div>
        </div>
        <div v-else>
          <div class="relative flex items-center gap-4">
            <span class="bg-zinc-900 px-6 py-3 rounded-lg text-white">{{ user.user.username }}</span>
            <VButton
                v-ripple
                :pt="{
              label: 'text-zinc-900',
            root: 'bg-white border-zinc-400 px-6 py-3',
            icon: 'text-zinc-900',
            loadingIcon: 'text-white'}"
                icon="pi pi-sign-out"
                label="Logout" loading-icon="pi pi-spinner pi-spin" @click="() => user.logout()"/>
          </div>
        </div>
      </div>
    </template>
  </VMenubar>
</template>

<script setup>
import {ref} from 'vue'
import {useCart, useUser} from '@/store/store.js'

const cart = useCart()
const user = useUser();

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