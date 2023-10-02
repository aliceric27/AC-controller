<template>
  <header class="grid grid-rows-3">
    <!-- 主 Logo -->
    <div class="flex justify-center p-2">
      <img src="/logo.png" alt="logo" />
    </div>
    <!-- 中間部分 -->
    <div class="flex justify-center items-center">
      <div class="flex justify-center items-center">
        <img class="icon-ac mx-2" src="/icon-ac.png" alt="icon-ac" />
        <h1 class="title">{{ $t("acController") }}</h1>
      </div>
    </div>
    <!-- 預留部分 -->
    <div class="">
      <select v-model="$i18n.locale" name="" id="locale-select">
        <option value="en">英文</option>
        <option value="zh">中文</option>
      </select>
    </div>
  </header>
</template>
<script setup></script>

<style scoped>
/* 頁面標題 */
.title {
  color: #717171;
  text-align: justify;
  font-family: Microsoft JhengHei UI;
  font-size: 18px;
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
