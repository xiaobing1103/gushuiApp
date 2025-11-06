<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">个人所得税</h2>
    <p class="text-gray-700 cursor-pointer" @click="router.push({ name: 'IncomeDetails' })">纳税明细页面!</p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

</script>

<style scoped></style>
