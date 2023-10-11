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
import useSocket from "~/composables/useSocket";
import useInfoStore from "~/store/index";
import { useRoute, useRouter } from "vue-router";
const { socket } = useSocket("http://192.168.0.241:7777");
socket.on("connect", () => {
  console.log("已連接到伺服器");
  socket.on("tmsList", (data) => {
    console.log("message", data);
  });
});
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
  height: 100dvh;
  width: 100%;
}
.warp {
  background: url(/image-10.png);
}
</style>
