<template>
  <div class="warp">
    <div class="flex flex-col items-center">
      <Floorlist />
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
const floorlist = store.getfloor;
// 樓層跳轉
const turnfloor = (floor: number) => {
  store.changeSelectedfloor(floor);
  store.turnfloor(floor, router);
};
</script>

<style scoped>
body {
  height: 100vh;
  width: 100%;
}
.warp {
  background: url(/image-10.png);
}
</style>
