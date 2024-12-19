import Base_Api from "~/api/base_api"

export default defineNuxtPlugin((nuxtApp) => {
    const api = {
        base_api: Base_Api()
    }
    return {
        provide: {
            api
        }
    }
})
