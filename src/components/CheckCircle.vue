<template>
  <button type="button"
    class="inline-flex items-center justify-center rounded-full border transition-colors select-none focus:outline-none focus:ring-2 focus:ring-offset-1"
    :class="[
      sizeClass.wrapper,
      disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      checked ? activeClass : inactiveClass
    ]" :aria-pressed="checked" :aria-disabled="disabled" @click="onClick" @keydown.space.prevent="onClick"
    @keydown.enter.prevent="onClick">
    <svg v-if="checked" :class="sizeClass.icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"
      stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
    <svg v-else :class="sizeClass.icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  checked: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: string // 预设类或 hex (#1E88FD)
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  size: 'sm',
  color: 'primary'
})

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

const sizeMap = {
  sm: { wrapper: 'w-5 h-5', icon: 'w-3.5 h-3.5' },
  md: { wrapper: 'w-6 h-6', icon: 'w-4 h-4' },
  lg: { wrapper: 'w-7 h-7', icon: 'w-5 h-5' }
}
const sizeClass = sizeMap[props.size]

const isHex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(props.color)

const activeClass = computed(() => {
  if (isHex) return 'text-white border-transparent'
  // 选中态：背景+文字为主题色
  return `bg-${props.color} text-white border-${props.color}`
})

const inactiveClass = 'bg-white text-gray-400 border-gray-300'

const style = computed(() => {
  if (!isHex) return undefined
  return props.checked
    ? { backgroundColor: props.color }
    : {}
})

const onClick = () => {
  if (props.disabled) return
  emit('toggle')
}
</script>

<style scoped>
button:focus-visible {
  outline: none;
}
</style>
