<template>
  <div 
    class="container" 
    v-for="(item, index) in props.options"
    @click="handleVote(item.id)">
    <div class="container_left">
      <label class="font-bold">{{ item.poll_name }}</label>
      <span class="text-xs">Voted: {{ votePercentage(item.votes) }}%</span>
    </div>
    <div class="container_right">
      <Icon name="mdi:like"/>
      {{ item.votes }}
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Poll {
    id: number,
    poll_name: string,
    votes: number
  }

  interface User {
    Name: string,
    Voted: boolean
  }

  const emit = defineEmits(['selected'])
  const props = defineProps({
    options: {
      type: Array<Poll>,
      required: true
    },
    users: {
      type: Array<User>,
      required: true
    }
  })

  const handleVote = (id: number) => {
    emit('selected', id)
  }

  const votePercentage = (votes: number) => {
    const result = (votes / (props.users.length) * 100).toFixed(1)
    return result
  }
</script>
<style lang="postcss" scoped>
.container {
  @apply 
    w-full 
    bg-blue-600 
    text-white 
    py-2 
    px-4 
    mt-2
    rounded-md 
    hover:bg-blue-700 
    transition
    flex
    justify-between
    items-center
    cursor-pointer;

  &_left {
    @apply
      flex
      flex-col;
  }

  &_right {
    @apply
      flex
      justify-center
      items-center
      gap-1;
  }
}
</style>
