// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  components: [
    {
      path: "~/components",
      pathPrefix: false
    }
  ],

  modules: ["@nuxtjs/tailwindcss", "nuxt-icon-tw"],

  postcss: {
    plugins: {
      "postcss-nested": {}
    }
  }
})