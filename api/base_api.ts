export interface Api {
    create<T>(endpoint: string, payload: T): Promise<any>
    get<T>(endpoint: string, params?: T): Promise<any>
    update<T>(endpoint: string, payload: T): Promise<any>
}

export default (): Api => ({
    create<T>(endpoint: string, payload: T) {
        return useFetch(`${endpoint}`, {
            method: "POST",
            body: payload,
            ...useApiInterceptor()
        })
    },
    get<T>(endpoint: string, params?: T) {
        return useFetch(`${endpoint}`, {
            method: "GET",
            params: params,
            ...useApiInterceptor()
        })
    },
    update<T>(endpoint: string, payload: T) {
        return useFetch(`${endpoint}`, {
            method: "PUT",
            body: payload,
            ...useApiInterceptor()
        })
    }
})