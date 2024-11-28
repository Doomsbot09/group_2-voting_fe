// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  ssr: false,

  components: [
    {
      path: "~/components",
      pathPrefix: false
    }
  ],

  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon-tw",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate"
  ],

  css: [
    '~/assets/css/global.css'
  ],

  postcss: {
    plugins: {
      "postcss-nested": {}
    }
  },

  runtimeConfig: {
    public: {
      host: process.env.APP_HOST,
      port: process.env.APP_PORT
    }
  }
})