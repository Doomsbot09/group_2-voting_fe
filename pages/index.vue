<template>
  <div class="container">
    <div class="card">
      <h1 class="card_title">Can't Decide Yet? Sample On This</h1>
      <button 
        class="card_action"
        @click="createPoll">
        Create a poll now!
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  const route = useRouter()
  const useStore = useVotingStore()

  const createPoll = async () => {
    route.push({ path: '/voting/create' })
  }

  onMounted(() => {
    // Clear State
    useStore.resetState()
  })

</script>

<style lang="postcss" scoped>
  .container {
    @apply 
      h-full 
      flex 
      items-center 
      justify-center;

    .card {
      @apply 
        bg-white 
        p-8 
        rounded-lg 
        shadow-lg 
        text-center 
        max-w-sm 
        w-full;

      &_title {
        @apply 
          text-2xl 
          font-bold 
          text-blue-700 
          mb-4;
      }

      &_action {
        @apply 
          w-full 
          bg-blue-600 
          text-white 
          py-2 
          px-4 
          rounded-md 
          hover:bg-blue-700 
          transition;
      }
    }
  }
</style>

