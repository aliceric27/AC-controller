<template>
  <div class="flex-col items-center justify-center hidden lg:flex">
    <!-- <div class="gold-text">{{ $route.params.id }}樓</div> -->
    <FloorSelect hidden class="lg:flex" />
    <Floorlist class="lg:hidden" />
    <RoomSelect class="lg:hidden" />
  </div>
  <div class="grid-flow-row p-4 warp lg:grid lg:grid-cols-8 lg: md:grid-cols-2">
    <div
      class="inline-flex items-center justify-center w-full gold-text lg:hidden"
    >
      {{ $route.params.id }}樓
    </div>
    <Floorlist class="lg:hidden" />
    <RoomSelect class="lg:hidden" />
    <AirCard v-if="floordata.length" :room="val" v-for="val in floordata" />
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import useSocketStore from "~/store/socketStore";
const socketStore = useSocketStore();
const route = useRoute();
const floordata = computed(() => {
  const data = socketStore.getRoomDataByFloor(Number(route.params.id));
  return data || []; // 如果 data 是 undefined，則返回空陣列
});
</script>
<style scoped>
.warp {
  height: 100vh;
  background: url(/image-10.png);
}
.gold-text {
  color: #c2a344;
  font-family: Microsoft JhengHei UI;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.25rem;
}
</style>
