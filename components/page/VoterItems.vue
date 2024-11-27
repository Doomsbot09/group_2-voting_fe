<template>
  <div class="container">
    <div class="container_left">
      <label class="font-bold">Nov 5-26</label>
      <span class="text-xs">Voted: 78%</span>
    </div>
    <div class="container_right">
      <Icon name="mdi:like"/>
      6
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style lang="postcss" scoped>
.container {
  @apply 
    w-full 
    bg-blue-600 
    text-white 
    py-2 
    px-4 
    mb-2
    rounded-md 
    hover:bg-blue-700 
    transition
    flex
    justify-between
    items-center;

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
