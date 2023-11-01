<template>
  <div id="login-wrap" class="flex items-center justify-center">
    <div class="flex flex-col items-center">
      <div class="m-2">
        <Logo />
      </div>
      <div class="m-2">
        <el-input
          class="my-2"
          clearable
          v-model="account"
          placeholder="請輸入帳號"
        />
        <el-input
          show-password
          clearable
          v-model="password"
          placeholder="請輸入密碼"
        />
      </div>
      <div class="w-full">
        <el-button
          @click="Login"
          class="w-full"
          type="primary"
          :disabled="checkform"
          :loading="formbtmloading"
          >登入</el-button
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: false,
});

import { pa } from "element-plus/es/locale";
import useLoginStore from "~/store/LoginStore";
import { jwtDecode } from "jwt-decode";
import type { FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();
const ruleFormRef = ref<FormInstance>();
const { $swal } = useNuxtApp();
interface Loginfo {
  account: Ref<string>;
  password: Ref<string>;
}
const Loginstore = useLoginStore();
const sendLogin = Loginstore.sendLogin;
const formbtmloading: Ref<boolean> = ref(false);
const account: Ref<string> = ref("");
const password: Ref<string> = ref("");
const checkform = computed(() => {
  if (account.value && password.value) return false;
  else return true;
});
const Login = async () => {
  formbtmloading.value = true;
  const inforaw = {
    username: account.value,
    password: password.value,
  };
  const respon = await sendLogin(inforaw);
  console.log("result", respon);
  if (respon.status) {
    const status = respon.status;
    if (status === "success") {
      const rawtoken = respon?.data?.access_token;
      localStorage.setItem("token", rawtoken);
      Loginstore.setToken(rawtoken);
      router.push("/");
      setTimeout(() => {
        formbtmloading.value = false;
      }, 1000);
    } else if (status === "error") {
      $swal.fire({
        title: "錯誤!",
        text: "帳號密碼錯誤",
        icon: "error",
        confirmButtonText: "確認",
      });
      setTimeout(() => {
        formbtmloading.value = false;
      }, 1000);
    }
  }
};
</script>
<style lang="scss" scoped>
#login-wrap {
  background-image: url(/image-10.png);
  min-height: 100vh;
  background-color: rgb(247, 247, 247);
}
</style>
