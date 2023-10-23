<template>
  <header class="grid grid-rows lg:grid-cols-3">
    <!-- 主 Logo -->
    <div class="flex justify-center p-2 lg:justify-start lg:p-4">
      <img
        class="cursor-pointer"
        @click="mainpage"
        src="/Logo.png"
        alt="logo"
      />
    </div>
    <!-- 中間部分 -->
    <div class="flex items-center justify-center">
      <div class="flex items-center justify-center m-2">
        <img class="mx-2 icon-ac" src="/icon-ac.png" alt="icon-ac" />
        <h1 class="title">{{ $t("acController") }}</h1>
      </div>
    </div>
    <p v-if="ismoke">Demo Mode (fetch rror)</p>
    <!-- <div> -->
    <!-- <select name="" id="" @change="changelang">
        <option value="zh">zh</option>
        <option value="en">en</option>
      </select>
    </div> -->
    <!-- 預留部分 -->
    <!-- <div class="">
      <select v-model="$i18n.locale" name="" id="locale-select">
        <option value="en">英文</option>
        <option value="zh">中文</option>
      </select>
    </div> -->
    <div></div>
  </header>
</template>
<script setup>
import { useRouter } from "vue-router";
import useSocketStore from "~/store/socketStore";
import { useI18n } from "vue-i18n";
const i18n = useI18n();
console.log(i18n);
const SocketStore = useSocketStore();
const ismoke = computed(() => SocketStore.isMokemode);
const router = useRouter();
const mainpage = () => router.push({ path: "/" });
const changelang = (event) => (i18n.locale.value = event.target.value);
</script>

<style scoped>
header {
  background: linear-gradient(
    180deg,
    #fff 32.81%,
    #f3f3f3 75.52%,
    #e0dfdf 99.99%,
    #cfcece 100%
  );
}
/* 頁面標題 */
.title {
  color: #717171;
  text-align: justify;
  font-family: Microsoft JhengHei UI;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 4.8px;
}
.icon-ac {
  width: 4.7rem;
  height: 3rem;
}
</style>
