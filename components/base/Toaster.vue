<template>
    <div class="fixed inset-0 flex flex-col items-end justify-start p-4 space-y-2 pointer-events-none z-10">
      <div
        v-for="(toast, index) in toasts"
        :key="index"
        class="bg-white text-gray-800 shadow-lg rounded-lg p-4 border-l-4"
        :class="{
          'border-green-500': toast.type === 'success',
          'border-red-500': toast.type === 'error',
          'border-blue-500': toast.type === 'info',
          'border-yellow-500': toast.type === 'warning',
        }"
      >
        {{ toast.message }}
      </div>
    </div>
</template>
  
<script setup lang="ts">
    interface Toast {
        message: string
        type: 'success' | 'error' | 'info' | 'warning'
    }
  
    const { $toast } = useNuxtApp()
    const toasts = $toast.toasts as Ref<Toast[]>
</script>
  
<style lang="postcss" scoped></style>
  