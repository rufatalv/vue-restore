<template>
  <div class="border-b sticky bg-white/90 backdrop-blur-[22px] z-10 top-0 border-b-slate-200 py-4">
    <div class="container flex justify-between items-center">
      <h1 class="text-2xl text-primary-500 font-bold">re:<span class="text-zinc-900">store</span></h1>
      <div class="flex gap-4 mr-auto ml-8">
        <div v-for="item in items" :key="item" class="flex ">
          <RouterLink v-ripple
                      :class="'flex px-3 py-2 rounded-md transition-all text-zinc-500 duration-300 hover:bg-zinc-950/10 hover:text-zinc-700  items-center '"
                      :to="item.to" active-class="!text-zinc-950">
            <span :class="item.icon"/>
            <span class="ml-3">{{ item.label }}</span>
          </RouterLink>
        </div>
      </div>
      <div class="relative group mr-4 h-full">
        <VButton v-ripple :badge="cart.items.length.toString()"
                 class="flex px-4 py-2 h-[38px] rounded-md text-sm transition-all text-white duration-300 hover:bg-zinc-950/10 hover:text-zinc-700  items-center"
                 icon="pi pi-shopping-bag" loading-icon="pi pi-spinner pi-spin" @click="() => cart.toggleCart()"/>
        <!--        <VBadge-->
        <!--            :value="cart.items.length"-->
        <!--            class="bg-transparent transition-all pointer-events-none duration-300 group-hover:text-zinc-950 text-white font-bold absolute -bottom-1 -left-0 scale-[0.9]"-->
        <!--        />-->
      </div>
      <div v-if="!user.isLoggedIn">
        <div class="relative h-full">
          <RouterLink to="/auth/login">
            <VButton v-ripple
                     class="flex px-3 py-2 bg-zinc-950 text-sm rounded-md transition-all text-white duration-300 hover:bg-zinc-950/10 hover:text-zinc-700  items-center"
                     icon="pi pi-sign-in" loading-icon="pi pi-spinner pi-spin"/>
          </RouterLink>
        </div>
      </div>
      <div v-else>
        <div class="relative flex items-center gap-4">
          <VButton aria-controls="overlay_menu" aria-haspopup="true" class="h-[38px]" icon="pi pi-ellipsis-v"
                   type="button"
                   @click="toggle"/>
          <div v-if="user.user">
            <VMenu id="overlay_menu" ref="menu" :model="menuItemsWithAdmin" :popup="true" :pt="{
            root: '!top-14 !right-0'
          }" class="w-[140px] ">
              <template #submenuitem="{ item }">
                <span class="text-zinc-900 text-sm font-semibold">{{ item.label }}</span>
              </template>
              <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                  <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                    <span :class="item.icon"/>
                    <span class="ml-2 font-medium text-sm">{{ item.label }}</span>
                  </a>
                </router-link>
                <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                  <span :class="item.icon"/>
                  <span class="ml-2 font-medium text-sm">{{ item.label }}</span>
                </a>
              </template>
            </VMenu>
          </div>

        </div>
      </div>

    </div>
  </div>

</template>
<script setup>
import {computed, onMounted, ref} from 'vue'
import {useCart, useUser} from '@/store/store.js'
import {useRoute} from "vue-router";

const route = useRoute()

const cart = useCart()
const user = useUser()

onMounted(() => {
  cart.initializeFromLocalStorage
})

const menu = ref();
const toggle = (event) => {
  menu.value.toggle(event);
};

const username = computed(() => user.user?.username || "Guest");

const menuItems = ref([
  {
    label: 'Profile',
    items: [
      {
        label: username,
        icon: 'pi pi-user',
        route: '/user/profile'
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        route: '/user/profile/update'
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        route: '/logout'
      }
    ]
  },
]);
const adminItems = ref([
  {
    label: 'Admin',
    items: [
      {
        label: 'Add Product',
        icon: 'pi pi-cog',
        route: '/admin/add-product'
      },
      {separator: true}
    ]
  },
])
const menuItemsWithAdmin = computed(() => {
  if (user.user.role === 'admin') {
    return [...adminItems.value, ...menuItems.value,]
  }
  return menuItems.value;
});
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
