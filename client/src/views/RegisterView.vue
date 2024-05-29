<template>
  <div class="container mt-10 min-h-[500px]">
    <div v-if="loading">
      <UILoader/>
    </div>
    <div v-else>
      <VCard>
        <template #content>
          <form class="flex flex-col gap-4" @submit="handleSubmit">
            <div class="flex flex-col gap-2">
              <h1 class="text-2xl">Register</h1>
              <p class="text-lg opacity-70">Register to access all features of our website!</p>
            </div>
            <VInputGroup>
              <VInputGroupAddon>
                <i class="pi pi-user"></i>
              </VInputGroupAddon>
              <VInputText v-model="login" placeholder="Username" type="text"/>
            </VInputGroup>
            <VInputGroup>
              <VInputGroupAddon>
                <i class="pi pi-envelope"></i>
              </VInputGroupAddon>
              <VInputText v-model="email" placeholder="Email" type="email"/>
            </VInputGroup>
            <VInputGroup>
              <VInputGroupAddon><i class="pi pi-lock"></i></VInputGroupAddon>
              <VInputText v-model="password" placeholder="Password" type="password"/>
            </VInputGroup>
            <VButton class="w-full" label="Login" type="submit"/>
            <p class="text-zinc-400">Already have an account?
              <router-link class="text-zinc-900" to="/auth/login">Sign In!</router-link>
            </p>

          </form>
        </template>
      </VCard>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import axios from "axios";
import {useRouter} from 'vue-router';
import {toast} from "@steveyuowo/vue-hot-toast";
import UILoader from "@/components/UILoader.vue";

const router = useRouter()
const loading = ref(false);
const login = ref(null);
const email = ref(null);
const password = ref(null);
const handleSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;

  try {
    const res = await axios.post(import.meta.env.VITE_API_URL + '/auth/sign-up', {
      username: login.value,
      password: password.value,
      email: email.value
    });

    if (res.status === 201) {
      await router.push('/auth/login');
      toast.success('Registered successfully!');
    }
  } catch (error) {
    console.error('Registration error:', error);
    toast.error('Registration failed. Please try again.');
  } finally {
    loading.value = false;
  }
}
</script>