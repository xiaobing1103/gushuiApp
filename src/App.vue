<template>

  <div>

    <!-- 改为使用插槽拿到匹配组件, 若无则显示提示 -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import './assets/tailwind.css'
// 若已在 main.ts use(router) 此处无需 import
// import router from './router' // 确认 router 文件存在并在 main.ts 中 app.use(router)
</script>

<!-- 移除 scoped 使全局原子类生效 -->
<style>
/* 可添加自定义扩展样式 */
</style>
