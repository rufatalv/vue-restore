<script setup>
import {Toaster} from "@steveyuowo/vue-hot-toast";
import "@steveyuowo/vue-hot-toast/vue-hot-toast.css";
import UINavbar from '@/components/UINavbar.vue'
import UICart from '@/components/UICart.vue'
import axios from "axios";

axios.interceptors.request.use(
    (config) => {
      const user = localStorage.getItem("user");
      const token = user ? JSON.parse(user).token : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    });
</script>

<template>
  <UINavbar/>
  <Toaster/>
  <UICart/>
  <main>
    <RouterView/>
  </main>
</template>