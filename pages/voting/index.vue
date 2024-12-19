<template>
    <Dialog
        :isVisible="showDialog"
        title="Hi Guest!"
        @confirm="handleConfirm">
        <input 
        type="text" 
        placeholder="Name here..."
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none" 
        v-model="userName" 
        @blur="handleFieldValidation"/>
        <span 
        v-show="invalidField"
        class="text-left text-red-500 text-sm mt-2">
        This field is required! {{ invalidField }}
        </span>
    </Dialog>
</template>

<script setup lang="ts">
    import { v4 as uuidv4 } from 'uuid';

    const { connectToNats, publish } = useNats()

    const useStore = useVotingStore()
    const route = useRouter()

    const guestName = useStore.guest.name
    const channel_id = useStore.channel_id
    const uuid = uuidv4().slice(0, 10)

    const showDialog = ref(false)
    const invalidField = ref(false)
    const userName = ref("")
    
    onMounted(async () => {
        // Init Connection for NATS
        await connectToNats()

        // Check if guest has already name
        if (!guestName) {
            openDialog()
        }

        // Lazy load poll
        await handlePoll()

        // Check if has channel_id
        if (channel_id === "") {
            route.push({ path: `/voting/create` })
        }
    })

    const openDialog = () => {
        showDialog.value = true
    }

    const handleConfirm = async () => {
        if (handleFieldValidation()) {
            const payload = {
                id: uuid,
                channel_id,
                name: useStore.guest.name
            }

            const { error } = await useStore.createUser(payload)

            if (!error.value) {
                useStore.guest.id = uuid

                // Init user list
                const { data, error: list_error, pending  } = await useStore.getUsers(channel_id)
                
                if (!list_error.value) {
                    useStore.users = data.value
                    
                    const message = {
                        action: "join",
                        channel: channel_id,
                        from: useStore.guest.name
                    }
                    
                    await publish(`${channel_id}`, JSON.stringify(message))
                    closeDialog()
                    route.push({ path: `/voting/${channel_id}` })
                }
                
            }
        }
    }

    const handlePoll = async () => {
        const { data, error, pending } = await useStore.getPoll(channel_id)
    
        if (!error.value) {
        useStore.poll = data.value
        }
    }

    const closeDialog = () => {
        showDialog.value = false
    }

    const handleFieldValidation = () => {
        let valid = false
        useStore.guest.name = userName.value

        if (!useStore.guest.name.trim()) {
            invalidField.value = true
            valid = false 
        } else {
            invalidField.value = false
            valid = true
        }
        return valid
    }

</script>

<style lang="postcss" scoped>
</style>

