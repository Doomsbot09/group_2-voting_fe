<template>
  <div class="container">
    <div class="container_left">
      <List />
    </div>
    <div class="container_right">
      <div class="poll_card">
          <div class="poll_card_content">
            <h1 class="poll_card_title">
              {{ polls.title || `No Name Found` }}
            </h1>
          </div>
          <VoterItems 
            :options="polls.options" 
            @selected="handleVote" />
      </div>
    </div>
  </div>
  <Dialog
    :isVisible="showDialog"
    title="Hi Guest!"
    @confirm="handleConfirm">
    <input type="text" placeholder="Name here..." v-model="userName" />
  </Dialog>
</template>

<script setup lang="ts">
  const route = useRoute()
  const useStore = useVotingStore()
  
  const polls = useStore.poll
  const guestName = useStore.guestName

  const showDialog = ref(false)
  const userName = ref("")

  onMounted(() => {
    // Check if guest has already name
    if (!guestName) {
      openDialog()
    }
  })

  const handleVote = async (id: number) => {
    console.log("ID handle Vote", id)
    console.log("id is", route.params.id)
  }

  const openDialog = () => {
    showDialog.value = true
  }

  const closeDialog = () => {
    showDialog.value = false
  }

  const handleConfirm = () => {
    // Set guest name on store
    useStore.guestName = userName.value
    closeDialog()
  }
</script>

<style lang="postcss" scoped>
  .container {
    @apply 
      h-full 
      flex;

      &_left {
        @apply 
          h-full
          w-1/2;

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

      &_right {
        @apply 
          h-full
          w-1/2
          bg-gray-50
          flex
          items-center
          justify-center;

        .poll_card {
          min-width: 50%;
          min-height: 10%;

          @apply
            relative 
            p-2
            bg-gradient-to-r 
            from-blue-500 
            to-purple-500 
            rounded-lg;

          &_content {
            @apply
              flex
              justify-center
              items-center
              bg-white 
              p-6 
              rounded-lg;
          }

          &_title {
            @apply 
              text-2xl 
              font-bold 
              text-blue-700
          }
        }
      }
  }
</style>
