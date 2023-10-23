// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";
import path from "path";
import { resolve } from "path";
function pathResolve(dir: string) {
  return resolve(__dirname, dir);
}
export default defineNuxtConfig({
  ssr: true,
  experimental: {
    payloadExtraction: false,
  },
  components: [
    { path: "~/components/room-page" },
    { path: "~/components/controller-page" },
    "~/components",
  ],
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  devServer: {
    host: "0.0.0.0", // 通過設置 0.0.0.0，您的開發服務器將可從外部訪問
    port: 3000, // 預設的端口是 3000，但您可以更改它
  },
  vite: {
    plugins: [svgLoader({ defaultImport: "url" })],
    resolve: {
      alias: {
        "@svg": path.resolve(__dirname, "./Assets/svg"),
      },
    },
    envDir: pathResolve("env"),
  },
});
