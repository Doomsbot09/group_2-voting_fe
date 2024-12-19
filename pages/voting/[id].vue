<template>
  <div class="container">
    <div class="container_left">
      <List :options="useStore.users" />
    </div>
    <div class="container_right">
      <div class="poll_card">
          <div class="poll_card_content">
            <h1 class="poll_card_title">
              {{ poll.Title || `No Name Found` }}
            </h1>
          </div>
          <VoterItems 
            :options="poll.Options"
            :users="users"
            @selected="handleSelectVote" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useNats } from "~/composables/nats";
  import { storeToRefs } from "pinia";

  const { connectToNats, publish, natsClient } = useNats()

  const route = useRoute()
  const router = useRouter()
  const useStore = useVotingStore()
  
  const channel_id: string | string[] = route.params.id
  const { poll, users } = storeToRefs(useStore)

  onMounted(async () => {

    // Init Connection for NATS
    await connectToNats()
    await stream()

    // Init API's
    await handlePoll()
    await handleUsers()

    // Check if has name
    if (useStore.guest.name === "") {
      useStore.channel_id = channel_id
      router.push({ path: `/voting` })
    }
    
  })

  const stream = () => {
    if (natsClient.value) {
      try {
          const sub = natsClient.value.subscribe(`${channel_id}`);
          (async () => {
              for await (const msg of sub) {
                  const received = new TextDecoder().decode(msg.data)
                  const { action, channel } = JSON.parse(received)

                  console.log("Received")
                  console.log("Received", action)
                  switch (action) {
                    case "vote":
                      if (channel === channel_id) {
                        await handlePoll() // For real-time checking updates on poll
                        await handleUsers() // For real-time checking if voted or not
                      }
                    break;
                    case "join":
                      if (channel === channel_id) {
                        await handleUsers()
                      }
                    break;
                    default: return false;
                  }
              }
          })()
      } catch (error: any) {
          console.error(`NATS Server Error On Subscribe: `, error)
      }
    }
  }

  const handleSelectVote = async (id: number) => {
    const message = {
      action: "vote",
      channel: channel_id,
      from: useStore.guest.name,
      voted: id
    }
    const payload = {
        id: useStore.guest.id,
        channel_id: channel_id,
        poll_id: id
    }

    const { data, error } = await useStore.updateUserVote(payload)

    if (!error.value) {
      const user_details = data.value.data
      
      await handleVoting(id, user_details)
      await publish(`${channel_id}`, JSON.stringify(message))
    }
  }

  const handleVoting = async (id: number, user_details: any) => {
    const has_voted = user_details["Voted"]
    const last_voted_id = useStore.guest.voted_poll_id

    if (has_voted && (last_voted_id === 0)) {
      // New Vote
      await useStore.increment(id)
      useStore.guest.voted_poll_id = id
    } else if (has_voted && (last_voted_id !== id)) {
      // Changed Vote
      await useStore.decrement(last_voted_id)
      await useStore.increment(id)
      useStore.guest.voted_poll_id = id
    } else {
      // UnVote
      await useStore.decrement(id)
      useStore.guest.voted_poll_id = 0
    }
    
    const { data, error, pending } = await useStore.updatePollVote(channel_id)

    if (!error.value) {
      // useStore.guest.voted_poll_id = id
    }
  }

  const handlePoll = async () => {
    const { data, error, pending } = await useStore.getPoll(channel_id)
  
    if (!error.value) {
      useStore.poll = data.value
    }
  }

  const handleUsers = async () => {
    const { data, error, pending } = await useStore.getUsers(channel_id)
    if (!error.value) {
      useStore.users = data.value
    }
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
