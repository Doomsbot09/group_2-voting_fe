<template>
  <div class="container">
    <div class="list">
      <div class="list_header">
        <h2 class="list_header_title">
          {{ totalUsers() }} People Joined The Poll
        </h2>
        <Icon 
          class="cursor-pointer" 
          name="mdi:content-copy" 
          size="1.5rem"
          @click="handleCopyLink" />
      </div>
      <div class="list_body">
        <ul class="list_body_items">
          <li
            v-for="(item, index) in props.options"
            :key="index"
            class="p-4 hover:bg-gray-50 transition">
            <p class="font-medium text-gray-800">{{ item?.Name }}</p>
            <p class="text-sm text-gray-500">Voted: {{ item?.Voted || false }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface User {
    Name: string,
    Voted: boolean
  }
  
  const { $toast } = useNuxtApp()
  const route = useRoute()
  const config = useRuntimeConfig()
  
  const props = defineProps({
    options: {
      type: Array<User>,
      required: true
    }
  })

  const handleCopyLink = async () => {
    try {
      const currentRoute = route.fullPath
      await navigator.clipboard.writeText(`${config.public.host}:${config.public.port}${currentRoute}`)      
      $toast.addToast('Successfully copied to clipboard!', 'success')
    } catch (err) {
      $toast.addToast('Failed to copy link!', 'error')
      console.error(err)
    }
  }

  const totalUsers = () => {
    const total: number = props.options.length
    return total
  }
</script>

<style lang="postcss" scoped>
  .container {
    @apply
      flex 
      items-center 
      justify-center;

    .list {
      @apply 
        max-w-sm 
        w-full 
        bg-white 
        rounded-lg 
        shadow-lg;

      &_header {
        @apply
          p-4 
          bg-gray-200
          flex
          justify-between
          items-center
          rounded-t-lg;

        &_title {
          @apply
            text-lg 
            font-bold 
            text-gray-800;
        }
      }

      &_body {
        @apply
          h-64
          overflow-y-auto;

        &_items {
          @apply
            divide-y 
            divide-gray-200;
        }
      }
    }
  }

/* Optional: Customize scrollbar to match the UI style */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: #cbd5e1; /* Matches the gray theme */
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #94a3b8; /* Darker gray on hover */
  cursor: pointer;
}
</style>
