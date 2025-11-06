<template>
  <!-- 整体容器 -->
  <div class="min-h-screen bg-gray-50 flex flex-col text-[15px]">
    <!-- 顶部导航栏 -->
    <CommonHeader title="收入纳税明细" />
    <!-- 可滚动内容 -->
    <main class="flex-1 overflow-y-auto">
      <div class="px-3 pt-3 pb-20">
        <!-- 分组: 纳税年度 -->
        <!-- 移除外层 SectionTitle，标题移入卡片 -->
        <div class="bg-white rounded-md shadow-sm mt-2 overflow-hidden">
          <div class="px-4 pt-3">
            <SectionTitle color="#1E88FD" class="mb-2">请选择纳税年度</SectionTitle>
          </div>
          <button
            class="w-full flex items-center justify-between px-4 py-3 active:bg-gray-50 border-t first:border-t-0 border-gray-100"
            @click="openYear = !openYear">
            <span class="text-gray-600">年度</span>
            <div class="ml-20 flex flex-1 items-center text-gray-800 justify-between">
              <span class=" font-medium">{{ year }}</span>
              <svg class="w-5 h-5 text-[#D4D4D4] transition-transform" :class="openYear ? 'rotate-90' : ''"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </div>
          </button>
          <transition name="fade">
            <div v-if="openYear" class="px-4 py-2 bg-gray-50">
              <div class="flex flex-wrap gap-2">
                <button v-for="y in yearOptions" :key="y" :class="y === year
                  ? 'px-3 py-1 rounded-full border text-sm bg-primary text-white border-primary'
                  : 'px-3 py-1 rounded-full border text-sm border-gray-300 text-gray-600'" @click="selectYear(y)">
                  {{ y }}
                </button>
              </div>
            </div>
          </transition>
        </div>

        <!-- 分组: 所得类型 -->
        <div class="bg-white rounded-md shadow-sm mt-2 overflow-hidden">
          <div class="px-4 pt-3">
            <SectionTitle color="#1E88FD" class="mb-2">请选择所得类型</SectionTitle>
          </div>
          <!-- 列表 -->
          <div v-for="item in visibleIncomeTypes" :key="item.key"
            class="flex items-center px-4 py-3 border-t first:border-t-0 border-gray-100" @click="toggleType(item.key)">
            <CheckCircle :checked="selectedTypes.has(item.key)" />
            <span class="ml-3 flex-1">{{ item.label }}</span>
          </div>

          <!-- 其他类型折叠 -->
          <button
            class="w-full flex items-center justify-center py-3 text-primary text-sm font-medium border-t border-gray-100"
            @click="showMore = !showMore">
            <span>其他类型</span>

            <img class="w-5 h-5 ml-1 transition-transform"
              src="http://file.1foo.com/2025/11/05/8edbe542b68ca9b2e279d84c1ee06093.png" alt="">
            <!-- <svg :class="showMore ? 'rotate-180' : ''" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <path d="M6 9l6 6 6-6" />
            </svg> -->
          </button>
          <transition name="fade">
            <div v-if="showMore" class="pb-2">
              <div v-for="item in extraIncomeTypes" :key="item.key"
                class="flex items-center px-4 py-3 border-t border-gray-100" @click="toggleType(item.key)">
                <CheckCircle :checked="selectedTypes.has(item.key)" />
                <span class="ml-3 flex-1">{{ item.label }}</span>
              </div>
            </div>
          </transition>
        </div>

        <!-- 查询按钮 -->
        <button
          class="mt-8 w-full bg-primary text-white rounded-md py-3 text-base font-medium active:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition"
          :disabled="selectedTypes.size === 0" @click="search">
          查询
        </button>

        <!-- 可选: 渐变背景示例 -->
        <!-- <div class="mt-4 h-10 rounded bg-gradient-primary"></div> -->
      </div>
    </main>
    <!-- 子路由出口，用于展示 DetailView -->
    <!-- <router-view /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import SectionTitle from '@/components/SectionTitle.vue'
import CheckCircle from '@/components/CheckCircle.vue'
import CommonHeader from '@/components/CommonHeader.vue'

const router = useRouter()

const year = ref(2025)
const yearOptions = [2025, 2024, 2023, 2022]
const openYear = ref(false)

const incomeTypes = [
  { key: 'wage', label: '工资薪金' },
  { key: 'labor', label: '劳务报酬' },
  { key: '稿酬', label: '稿酬' },
  { key: 'royalty', label: '特许权使用费' },
]

const extraIncomeTypes = [
  { key: 'interest', label: '利息' },
  { key: 'dividend', label: '股息红利' },
  { key: 'rent', label: '财产租赁' },
]

const selectedTypes = ref<Set<string>>(new Set(incomeTypes.map(i => i.key)))
const showMore = ref(false)

const visibleIncomeTypes = computed(() => incomeTypes)

const toggleType = (key: string) => {
  const set = selectedTypes.value
  set.has(key) ? set.delete(key) : set.add(key)
}

const selectYear = (y: number) => {
  year.value = y
  openYear.value = false
}

const search = () => {
  console.log('查询年度:', year.value, '所得类型:', Array.from(selectedTypes.value))
  router.push(
    '/DetailView'
  )
}

const goBack = () => history.back()
</script>

<!-- 移除 scoped, 自定义细微样式 -->
<style scoped lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity .18s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
