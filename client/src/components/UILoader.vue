<template>
  <div
      v-motion
      :enter="{
          opacity: 1,
          transition: {
            delay: 200
          }
        }"
      :initial="{ opacity: 0 }"
      :leave="{
          opacity: 0,
          transition: {
            delay: 200
          }
        }"
      class="container flex justify-center items-center mx-auto my-10 text-center"
  >
    <div
        class="!border-t-primary-500"
        style="
            width: 50px;
            height: 50px;
            border: 4px solid #f7f7f7;
            border-top: 4px solid #333;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          "
    ></div>
  </div>
</template>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
<script setup>
</script>