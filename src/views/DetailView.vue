<template>
  <div class="min-h-screen bg-[#f6f7fb] text-[#333333] text-[15px]">
    <CommonHeader title="收入纳税明细" />

    <main class="pb-10">
      <section class="bg-white px-4 py-4 mt-2">
        <dl class="space-y-3">
          <div class="flex items-center justify-between">
            <dt class="flex items-center text-[#9c9c9c]">
              <span class="flex items-center">收入合计 <img class="w-4 h-4 mx-1"
                  src="http://file.1foo.com/2025/11/05/b6f99802a4beb2950f6ec98a2b77a5c2.png" alt="">:</span>

            </dt>
            <dd class="text-[15px]  text-[#1c1c1e]">{{ summary.totalIncomeText }}</dd>
          </div>
          <div class="flex items-center justify-between">
            <dt class="text-[#9c9c9c]">已申报税额合计 :</dt>
            <dd class="text-[15px]  text-[#1c1c1e]">{{ summary.declaredTaxText }}</dd>
          </div>
        </dl>
      </section>

      <section class=" mt-3">
        <article v-for="item in incomeEntries" :key="item.id"
          class="px-4 py-4 border-b bg-white   border-[#f0f1f5] last:border-b-0 mt-3">
          <header class="flex items-center justify-between text-[16px] font-medium text-[#1c1c1e]">
            <span>{{ item.type }}</span>
            <span class="mr-10">{{ item.month }}</span>
          </header>

          <p class="mt-3 text-[14px] text-[#9c9c9c]">{{ item.subclass }}</p>

          <div class="mt-2 flex items-center justify-between">
            <span class="text-[14px] text-[#9c9c9c] truncate">{{ item.payer }}</span>
            <svg v-if="item.showArrow" class="w-6 h-6 ml-2 text-[#c0c4cc]" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.6">
              <path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>

          <div class="mt-3  justify-between text-[15px]">
            <span class="text-[#9c9c9c]">收入：</span>
            <span class="font-medium text-[#9c9c9c]">{{ item.incomeText }}</span>
          </div>
          <div class="mt-1  justify-between text-[15px]">
            <span class="text-[#9c9c9c]">已申报税额：</span>
            <span class="font-medium text-[#9c9c9c]">{{ item.declaredTaxText }}</span>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CommonHeader from '@/components/CommonHeader.vue'
import { rawIncomeEntries, type IncomeItem } from './datas'



type DisplayIncomeItem = IncomeItem & {
  taxable: number
  cumulativeTaxable: number
  cumulativeTax: number
  declaredTax: number
  incomeText: string
  declaredTaxText: string
}

const TAX_BRACKETS = [
  { max: 36000, rate: 0.03, quick: 0 },
  { max: 144000, rate: 0.1, quick: 2520 },
  { max: 300000, rate: 0.2, quick: 16920 },
  { max: 420000, rate: 0.25, quick: 31920 },
  { max: 660000, rate: 0.3, quick: 52920 },
  { max: 960000, rate: 0.35, quick: 85920 },
  { max: Number.POSITIVE_INFINITY, rate: 0.45, quick: 181920 },
]

const formatCurrency = (value: number) => `${value.toFixed(2)}元`

const calcTax = (taxable: number) => {
  if (taxable <= 0) return 0
  const bracket = TAX_BRACKETS.find(b => taxable <= b.max)!
  return Math.max(Number((taxable * bracket.rate - bracket.quick).toFixed(2)), 0)
}


const incomeEntries = computed<DisplayIncomeItem[]>(() => {
  const ordered = [...rawIncomeEntries].sort((a, b) => {
    const monthCompare = a.month.localeCompare(b.month)
    return monthCompare !== 0 ? monthCompare : a.id - b.id
  })

  let cumulativeTaxable = 0
  let cumulativeDeclared = 0
  const computedMap = new Map<number, DisplayIncomeItem>()

  ordered.forEach(entry => {
    const taxable = Math.max(entry.income - entry.socialInsurance - entry.deduction, 0)
    cumulativeTaxable += taxable
    const cumulativeTax = calcTax(cumulativeTaxable)
    const declaredTax = Math.max(Number((cumulativeTax - cumulativeDeclared).toFixed(2)), 0)
    cumulativeDeclared += declaredTax

    computedMap.set(entry.id, {
      ...entry,
      taxable,
      cumulativeTaxable,
      cumulativeTax,
      declaredTax,
      incomeText: formatCurrency(entry.income),
      declaredTaxText: formatCurrency(declaredTax),
    })
  })

  return rawIncomeEntries.map(entry => computedMap.get(entry.id)!)
})

const summary = computed(() => {
  const entries = incomeEntries.value
  const totalIncome = entries.reduce((sum, entry) => sum + entry.income, 0)
  const totalTax = entries.reduce((sum, entry) => sum + entry.declaredTax, 0)
  return {
    totalIncomeText: formatCurrency(totalIncome),
    declaredTaxText: formatCurrency(totalTax),
  }
})

const router = useRouter()
const route = useRoute()

const goBack = () => router.back()
const goBatchAppeal = () => {
  console.log('批量申诉', { year: route.query.year, types: route.query.types })
}
</script>
<style scoped></style>
