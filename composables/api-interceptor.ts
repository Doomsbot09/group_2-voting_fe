import type { FetchOptions } from "ofetch"

export const useApiInterceptor = (): Partial<FetchOptions> => {
    const config = useRuntimeConfig()  

    return {
      baseURL: config.public.api_base_url,
      async onRequest({ request, options }) {

      },
      async onRequestError({ request, response, options }) {

      },
      async onResponse({ request, response, options }) {

      },
      async onResponseError({ request, response, options }) {

      }
    }
  }
