<template>
    <div
      v-if="isVisible"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <!-- Dialog Box -->
      <div
        class="bg-white p-6 rounded-lg shadow-lg w-96"
        @click.stop
      >
        <!-- Dialog Header -->
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-bold">{{ title }}</h3>
          <!-- <button @click="closeDialog" class="text-gray-500 hover:text-gray-800">
            &times;
          </button> -->
        </div>
        <!-- Dialog Body -->
        <div class="mt-4">
          <slot>
            Default dialog content goes here.
          </slot>
        </div>
        <!-- Dialog Footer -->
        <div class="mt-6 flex justify-end space-x-2">
          <!-- <button
            class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            @click="closeDialog"
          >
            Cancel
          </button> -->
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            @click="confirmAction"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
</template>
  
<script setup lang="ts">
  // Props to accept from parent
  defineProps({
    title: {
      type: String,
      default: 'Dialog',
    },
    isVisible: {
      type: Boolean,
      required: true,
    },
  })
  
  // Emit events for close and confirm actions
  const emit = defineEmits(['close', 'confirm'])
  
  const closeDialog = () => {
    emit('close')
  }
  
  const confirmAction = () => {
    emit('confirm')
  }
  </script>
  
<style lang="postcss" scoped>
</style>
  