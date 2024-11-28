export const useVotingStore = defineStore('votingStore', {
    state: () => ({
      poll: {
        title: "",
        options: []
      },
      users: [
        {
          name: "Dominic",
          voted: false
        }
      ],
      guestName: ""
    }),
    persist: true,
    actions: {
      async createPoll(data: any) {
        console.log("Created Poll", data)
        const mappedData = data.options.map((item: any, index: number) => ({ id: index, option: item, votes: 0 }))
        this.poll = {
          ...data,
          options: mappedData
        }
      },
      async updateVote(id: number) {
        console.log("update vote of id", id)
      }
    }
  })
  