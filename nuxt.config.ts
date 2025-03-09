// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@nuxt/image",
  ],
  colorMode: {
    preference: "system", // Default to system preference
    fallback: "light", // Fallback mode if no preference is set
    storageKey: "nuxt-color-mode", // Key used in localStorage
  },
  alias: {
    components: "/components",
    pages: "/pages",
    utils: "/utils",
    assets: "/assets",
  },
  runtimeConfig: {
    public: {
      apiBase: "https://api.example.com",
    },
  },
  typescript: {
    strict: false,
  },
});
