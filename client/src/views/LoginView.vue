<template>
  <div class="container mt-10 min-h-[500px]">
    <div v-if="loading">
      <UILoader />
    </div>
    <div v-else>
      <VCard>
        <template #content>
          <form class="flex flex-col gap-4" @submit="handleSubmit">
            <div class="flex flex-col gap-2">
              <h1 class="text-2xl">Login</h1>
              <p class="text-lg opacity-70">Login to access all features of our website!</p>
            </div>
            <VInputGroup>
              <VInputGroupAddon>
                <i class="pi pi-user"></i>
              </VInputGroupAddon>
              <VInputText v-model="login" placeholder="Username" type="text"/>
            </VInputGroup>
            <VInputGroup>
              <VInputGroupAddon><i class="pi pi-lock"></i></VInputGroupAddon>
              <VInputText v-model="password" placeholder="Password" type="password"/>
            </VInputGroup>
            <VButton class="w-full" label="Login" type="submit"/>
            <p class="text-zinc-400">Don't have an account? <RouterLink class="text-zinc-900" to="/auth/register">Sign Up!</RouterLink></p>
          </form>
        </template>
      </VCard>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import axios from "axios";
import {useUser} from "@/store/store.js";
import {useRouter} from 'vue-router';
import {toast} from "@steveyuowo/vue-hot-toast";
import UILoader from "@/components/UILoader.vue";

const router = useRouter()
const loading = ref(false);
const login = ref(null);
const password = ref(null);
const store = useUser();
const handleSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  const res = await axios.post(import.meta.env.VITE_API_URL + '/auth/sign-in', {
    username: login.value, password: password.value
  });
  console.log(res.data)
  store.setUser(res.data.user)
  if (res.status === 200) {
    await router.push('/');
    loading.value = false;
    toast.success('Logged in successfully!')
    window.location.reload()

  }
}
</script>