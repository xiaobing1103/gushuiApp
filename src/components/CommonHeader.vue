<template>
  <!-- 顶部导航栏 -->
  <header class="h-12 flex items-center px-3 bg-white border-b border-gray-200">
    <button @click="goBack" class="flex items-center text-gray-600 active:opacity-70">
      <svg class="w-7 h-7 mr-1 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
        <path d="M15 18l-6-6 6-6" />
      </svg>
      <span class="text-sm text-primary">返回</span>
    </button>
    <h1 class="flex-1 text-center text-base  font-medium tracking-wide">{{ title }}</h1>


    <button class="flex justify-center flex-col text-[15px] text-[#3c76ff] mr-2 items-center"
      @click="goBatchAppeal">批量申诉</button>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const props = defineProps<{ title: string }>()
console.log(props.title)
const router = useRouter()

const goBack = () => {
  router.back()
}
const goBatchAppeal = () => {
  router.push({ name: 'BatchAppeal' })
}
</script>

<style scoped></style>
