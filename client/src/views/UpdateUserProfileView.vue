<template>
  <div class="container mt-10">
    <div class="flex flex-col gap-4">
      <h1 class="text-2xl">User Profile</h1>
      <p class="text-lg opacity-70">View and edit your profile information</p>
    </div>
    <div class="mt-4">
      <VCard>
        <template #content>
          <div class="flex flex-col gap-4">
            <h2 class="text-xl">Profile Information</h2>
            <div class="flex flex-col gap-2">
              <label for="username">Username</label>
              <input id="username" class="p-2 border border-gray-300 rounded-md" type="text" value="username"/>
            </div>
            <div class="flex flex-col gap-2">
              <label for="email">Email</label>
              <input id="email" class="p-2 border border-gray-300 rounded-md" type="email" value="email"/>
            </div>
            <div class="flex flex-col gap-2">
              <label for="password">Password</label>
              <input id="password" class="p-2 border border-gray-300 rounded-md" type="password" value="password"/>
            </div>
            <VButton class="w-full" label="Update Profile"/>
          </div>
        </template>
      </VCard>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useUser} from '@/store/store.js';
import {toast} from "@steveyuowo/vue-hot-toast";

const user = useUser();

</script>