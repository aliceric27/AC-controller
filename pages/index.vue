<template>
  <FloorSelect />
  <div class="warp">
    <!-- Header -->
    <Theheader />
    <!-- 樓層卡片資料 -->
    <div class="flex flex-col items-center">
      <div v-for="val in floorlist">
        <MainCard :floor="val" @click="turnfloor(val)" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useInfoStore from "~/store/index";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const store = useInfoStore();
const countfloor = store.countfloor;
const turnfloor = (floor: number) => {
  store.turnfloor(floor, router);
};
const floorlist = countfloor(store.floor);
</script>
<style scoped>
body {
  height: 100%;
  width: 100%;
}
.warp {
  background: url(/image-10.png);
}
</style>
