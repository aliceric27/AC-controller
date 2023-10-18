<template>
  <div class="warp">
    <div>
      <FloorSelect class="hidden lg:flex" />
      <Floorlist class="lg:hidden" />
      <RoomSelect class="lg:hidden" />
    </div>
    <div class="p-4 lg:grid lg:grid-cols-8 md:grid-cols-5">
      <div
        class="inline-flex items-center justify-center w-full gold-text lg:hidden"
      >
        {{ $route.params.id }}樓
      </div>
      <Floorlist class="lg:hidden" />
      <RoomSelect class="lg:hidden" />
      <AirCard v-if="floordata.length" :room="val" v-for="val in floordata" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import useInfoStore from "~/store/InfoStore";
import useSocketStore from "~/store/socketStore";
// init var
const socketStore = useSocketStore();
const InfoStore = useInfoStore();
const route = useRoute();
const selectedfloor = computed(() => InfoStore.selectedfloor);
const floordata = computed(() => {
  console.log("selectedfloor", selectedfloor.value);
  const data = socketStore.getRoomDataByFloor(selectedfloor.value);
  return data.length ? data : []; // 如果 data 是 undefined，則返回空陣列
});
</script>
<style scoped>
.warp {
  background: url(/image-10.png);
  height: 100vh;
}
</style>
