<template>
  <div class="p-4 warp lg:h-screen">
    <div
      class="flex flex-col flex-wrap items-center gap-2 lg:grid lg:grid-cols-6"
    >
      <Floorlist class="lg:hidden" />
      <div v-for="val in floordata" class="btn-scale">
        <MainCard :floor="val.floorNo" @click="turnfloor(val.floorNo)" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useInfoStore from "~/store/InfoStore";
import useSocketStore from "~/store/socketStore";
import { useRouter } from "vue-router";
const socketStore = useSocketStore();
socketStore.initializeSocket(`${import.meta.env.VITE_Socket_URL}`);
console.log(import.meta.env);
const router = useRouter();
const InfoStore = useInfoStore();
const floordata = computed(() => {
  console.log("floorData", socketStore.floorData);
  return socketStore.floorData;
});
const floorlist = computed(() => socketStore.floorList);
// 樓層跳轉
const turnfloor = (floor: number) => {
  InfoStore.changeSelectedfloor(floor);
  InfoStore.turnfloor(floor, router);
};
</script>

<style scoped>
body {
  min-height: 100vh;
  width: 100%;
}
.warp {
  background: url(/image-10.png);
}

.btn-scale {
  transition: transform 0.3s ease-in-out; /* 添加此行以設定平滑過渡 */
}
.btn-scale:hover {
  transform: scale(1.05);
}
</style>
