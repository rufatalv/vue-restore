<script setup>
import {Toaster} from "@steveyuowo/vue-hot-toast";
import "@steveyuowo/vue-hot-toast/vue-hot-toast.css";
import UINavbar from '@/components/UINavbar.vue'
import UICart from '@/components/UICart.vue'

</script>

<template>
  <UINavbar/>
  <Toaster/>
  <UICart/>
  <main>
    <RouterView/>
  </main>
</template>