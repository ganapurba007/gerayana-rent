<script setup>
import { ref } from 'vue'
import homeData from '../../data/home.json'
import { useInView } from '../../composables/useInView'
import { useCountUp } from '../../composables/useCountUp'

const sectionRef = ref(null)
const { isInView } = useInView(sectionRef)
const stats = homeData.stats || []

// Animated Counters for each stat item
const count0 = useCountUp(stats[0]?.value || 0, isInView, 1500)
const count1 = useCountUp(stats[1]?.value || 0, isInView, 1500)
const count2 = useCountUp(stats[2]?.value || 0, isInView, 1500)

const animatedCounts = [count0, count1, count2]
</script>

<template>
  <section ref="sectionRef" class="py-16 bg-white border-b border-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
        <div
          v-for="(item, idx) in stats"
          :key="idx"
          class="pt-6 md:pt-0 px-4 first:pt-0"
        >
          <div class="flex items-baseline justify-center gap-1 mb-2">
            <span class="text-4xl sm:text-5xl font-extrabold text-brand-600 tracking-tight">
              {{ animatedCounts[idx]?.currentCount?.value || 0 }}
            </span>
            <span class="text-2xl sm:text-3xl font-bold text-accent-500">
              {{ item.suffix }}
            </span>
          </div>
          <span class="text-sm font-semibold text-slate-700 tracking-wide uppercase">
            {{ item.label }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
