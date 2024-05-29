<template>
  <div class="container mt-10">
    <VCard>
      <template #content>
        <form class="flex flex-col gap-4" @submit="handleSubmit">
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
        </form>
      </template>
    </VCard>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import axios from "axios";
import {useUser} from "@/store/store.js";
import {useRouter} from 'vue-router';
import {toast} from "@steveyuowo/vue-hot-toast";

const router = useRouter()
const login = ref(null);
const password = ref(null);
const store = useUser();
const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await axios.post('/auth/sign-in', {
    username: login.value, password: password.value
  });
  console.log(res.data)
  store.setUser(res.data.user)
  if (res.status === 200) {
    await router.push('/');
    toast.success('Logged in successfully!')
  }
}
</script>