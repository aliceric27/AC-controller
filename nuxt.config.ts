// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  server: {
    host: "0.0.0.0", // 通過設置 0.0.0.0，您的開發服務器將可從外部訪問
    port: 3000, // 預設的端口是 3000，但您可以更改它
  },
});
