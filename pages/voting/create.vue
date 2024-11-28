<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h1 class="text-2xl font-bold text-blue-600 text-center mb-4">Create Poll</h1>
      <form @submit.prevent="submitForm">
        <!-- Title Field -->
        <div class="mb-4">
          <label for="title" class="block text-gray-600 text-sm mb-2">Title</label>
          <input
            type="text"
            id="title"
            v-model="form.title"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter poll title"
          />
        </div>

        <!-- Options Field -->
        <div class="mb-4">
          <label for="options" class="block text-gray-600 text-sm mb-2">Options</label>
          <div v-for="(option, index) in form.options" :key="index" class="flex items-center mb-2">
            <input
              type="text"
              v-model="form.options[index]"
              :placeholder="`Option ${index + 1}`"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            />
            <button
              v-if="form.options.length > 2"
              type="button"
              class="ml-2 text-red-500"
              @click="removeOption(index)"
            >
              ✖
            </button>
          </div>
          <button
            type="button"
            class="text-blue-600 text-sm font-semibold mt-2"
            @click="addOption"
            :disabled="form.options.length >= 5"
          >
            + Add Option
          </button>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Create Poll
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface PollForm {
    title: string;
    options: string[];
  }

  const useStore = useVotingStore()
  const route = useRouter()

  const form = ref<PollForm>({
    title: '',
    options: [''],
  });

  const addOption = () => {
    form.value.options.push('');
  };

  const removeOption = (index: number) => {
    if (form.value.options.length > 1) {
      form.value.options.splice(index, 1);
    }
  };

  const submitForm = async () => {
    console.log('Form submitted:', form.value)
    await useStore.createPoll(form.value)
    route.push({ path: `/voting/54321` })
  };
</script>

<style lang="postcss" scoped>
  .container {
    @apply h-full flex items-center justify-center;

    .card {
      @apply bg-white p-8 rounded-lg shadow-lg text-center max-w-sm w-full;

      &_title {
        @apply text-2xl font-bold text-blue-700 mb-4;
      }

    }
  }
</style>
