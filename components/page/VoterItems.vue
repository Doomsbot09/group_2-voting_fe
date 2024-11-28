<template>
  <div 
    class="container" 
    v-for="(item, index) in props.options"
    @click="handleVote(item.id)">
    <div class="container_left">
      <label class="font-bold">{{ item.option }}</label>
      <span class="text-xs">Voted: 0%</span>
    </div>
    <div class="container_right">
      <Icon name="mdi:like"/>
      {{ item.votes }}
    </div>
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits(['selected'])
  const props = defineProps({
    options: {
      type: Array,
      required: true
    }
  })

  const handleVote = (id: number) => {
    console.log("handleVote", id)
    emit('selected', id)
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
