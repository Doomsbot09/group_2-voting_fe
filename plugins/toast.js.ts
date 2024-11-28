interface Toast {
    message: string
    type: 'success' | 'error' | 'info' | 'warning'
}
  
interface ToastPlugin {
    toasts: Ref<Toast[]>
    addToast: (message: string, type?: Toast['type']) => void
}

export default defineNuxtPlugin((nuxtApp) => {
    const toasts = ref<Toast[]>([])

    const addToast = (message: string, type: Toast['type'] = 'info') => {
        toasts.value.push({message, type})
        setTimeout(() => {
            toasts.value.shift()
        }, 3000)
    }

    // Provide the `toast` and `addToast` globally
    return {
        provide: {
          toast: {
            toasts,
            addToast,
          } as ToastPlugin,
        },
    }
})
