<template>
  <div class="warp">
    <div class="flex flex-col items-center">
      <Floorlist />
      <div v-for="val in floordata">
        <MainCard :floor="val.floorNo" @click="turnfloor(val.floorNo)" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useInfoStore from "~/store/index";
import { useRouter } from "vue-router";
import { useSocketStore } from "~/store/socketStore";
const socketStore = useSocketStore();
socketStore.initializeSocket("http://192.168.0.241:7777");
const router = useRouter();
const store = useInfoStore();
const floordata = computed(() => {
  console.log("floorData", socketStore.floorData);
  return socketStore.floorData;
});
const floorlist = computed(() => socketStore.floorList);
// 樓層跳轉
const turnfloor = (floor: number) => {
  store.changeSelectedfloor(floor);
  store.turnfloor(floor, router);
};
</script>

<style scoped>
body {
  height: 100dvh;
  width: 100%;
}
.warp {
  background: url(/image-10.png);
}
</style>
