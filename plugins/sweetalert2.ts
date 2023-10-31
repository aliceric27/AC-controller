import { NuxtApp } from "nuxt/schema";
import Swal from "sweetalert2";
declare function useNuxtApp(): NuxtApp;
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("swal", Swal);
});
