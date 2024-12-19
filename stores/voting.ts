interface PollOptions {
  id: number,
  poll_name: string,
  votes: number
}

export const useVotingStore = defineStore('votingStore', {
    state: () => ({
      poll: {
        ID: null,
        Title: "",
        Options: [] as PollOptions[]
      },
      users: [],
      channel_id: "" as string | string[],
      guest: {
        id: "",
        name: "",
        voted_poll_id: 0
      }
    }),
    persist: true,
    actions: {
      async createPoll(data: any, channel_id: string) {
        const { $api } = useNuxtApp()
        const mappedOptions = data.options.map((item: any, index: number) => ({ id: (index + 1), poll_name: item, votes: 0 }))
        const payload = {
          ...data,
          id: channel_id,
          options: mappedOptions
        }

        const resp = await $api.base_api.create(`poll`, payload)
        return resp
      },
      async getPoll(channel_id: string | string[]) {
        const { $api } = useNuxtApp()
        const resp = await $api.base_api.get(`poll/${channel_id}`)
        return resp
      },
      async createUser(payload: any) {
        const { $api } = useNuxtApp()
        const resp = await $api.base_api.create(`user`, payload)
        return resp
      },
      async getUsers(channel_id: string | string[]) {
        const { $api } = useNuxtApp()
        const resp = await $api.base_api.get(`user/list/${channel_id}`)
        return resp
      },
      async updatePollVote(channel_id: string | string[]) {
        const { $api } = useNuxtApp()
        const payload = {
          options: this.poll.Options
        }
        const resp = await $api.base_api.update(`poll/vote/${channel_id}`, payload)
        return resp
      },
      async updateUserVote(payload: any) {
        const { $api } = useNuxtApp()
        const resp = await $api.base_api.update(`user/vote`, payload)
        return resp
      },
      async increment(id: number) {
        const index: number = this.poll.Options.findIndex((item: any) => item.id === id);
        if (index != -1) {
          this.poll.Options[index].votes += 1
        }
      },
      async decrement(id: number) {
        const index: number = this.poll.Options.findIndex((item: any) => item.id === id);
        if (index != -1) {
          this.poll.Options[index].votes -= 1
        }
      },
      resetState() {
        // Reset state to its initial values
        this.$reset();
      }
    }
  })
  