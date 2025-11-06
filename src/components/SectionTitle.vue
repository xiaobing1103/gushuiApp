<template>
  <!-- 主容器 -->
  <div class="flex items-center select-none" :class="wrapperClass">
    <!-- 左侧竖条 -->
    <span class="inline-block flex-shrink-0"
      :class="[barWidthClass, barHeightClass, props.barRound ? 'rounded-sm' : '', resolvedBgClass]"
      :style="barStyle"></span>
    <!-- 标题文本 -->
    <span class="ml-2 font-bold tracking-wide text-gray-800" :class="textClass">
      <slot />
    </span>
    <!-- 右侧附加内容(可选) -->
    <div v-if="$slots.extra" class="ml-auto">
      <slot name="extra" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  color?: string          // 例如: primary / blue-600 / #FF5722
  size?: 'sm' | 'md' | 'lg'
  barWidth?: string       // w-1 / w-1.5 / w-2
  barRound?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'blue-600',
  size: 'sm',
  barWidth: 'w-1',
  barRound: true
})

const sizeMap = {
  sm: { barHeight: 'h-4', textSize: 'text-sm' },
  md: { barHeight: 'h-6', textSize: 'text-base' },
  lg: { barHeight: 'h-7', textSize: 'text-lg' }
}
const current = sizeMap[props.size]

const barHeightClass = current.barHeight
const barWidthClass = props.barWidth
const textClass = computed(() => current.textSize)
const wrapperClass = computed(() => props.class ?? '')

// 允许的预置颜色类(需要在源码中出现以便 Tailwind 生成)
const presetColorClasses = new Set([
  'blue-600',
  'primary',
  'emerald-500',
  'red-500',
  'gray-600'
])

// 解析颜色：若是 hex 则用 style，若是预设则用 bg-xxx
const isHex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(props.color)
const resolvedBgClass = isHex
  ? '' // 用 style
  : presetColorClasses.has(props.color!)
    ? `bg-${props.color}`
    : 'bg-blue-600' // 回退

const barStyle = computed(() => {
  return isHex ? { backgroundColor: props.color } : undefined
})
</script>

<style scoped>
/* 可按需补充定制 */
</style>
