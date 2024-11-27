<template>
  <div class="container">
    <div class="list">
      <div class="list_header">
        <h2 class="list_header_title">
          10 People Joined The Poll 
        </h2>
        <Icon name="mdi:content-copy" size="1.5rem" />
      </div>
      <div class="list_body">
        <ul class="list_body_items">
          <li
            v-for="(item, index) in items"
            :key="index"
            class="p-4 hover:bg-gray-50 transition">
            <p class="font-medium text-gray-800">{{ item.name }}</p>
            <p class="text-sm text-gray-500">Voted: {{ item.voted }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { name: "Dominic", voted: true },
        { name: "John", voted: false },
        { name: "Cj", voted: true },
        { name: "Marven", voted: false },
        { name: "Christle", voted: true },
        { name: "Johnny", voted: true },
        { name: "Angel", voted: true },
        { name: "Krysten", voted: true },
        { name: "Hoper", voted: true },
      ],
    };
  },
};
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
}
</style>
