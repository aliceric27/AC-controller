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
        {{ selectedfloor }}樓
      </div>

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
InfoStore.setDataupdate(false);
InfoStore.setFirstrun(true);
</script>
<style scoped>
.warp {
  background-color: #c2a344;
  background: url(/image-10.png);
  min-height: 100vh;
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
