// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  alias: {
    components: "/components",
    pages: "/pages",
    utils: "/utils",
    assets: "/assets",
     
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://api.example.com'
    }
  },
  typescript: {
    strict: false
  }
})