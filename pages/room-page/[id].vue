<template>
  <div class="warp">
    <div class="inline-flex items-center justify-center w-full gold-text">
      {{ $route.params.id }}樓
    </div>
    <Floorlist />
    <RoomSelect @change="movetoid" />
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
// tmp fake data
const fakeroom = () => {
  let result = [];
  for (let i = 501; i < 520; i++) {
    result.push(String(i));
  }
  return result;
};
const movetoid = (event: Event) => {
  const element = event.target as HTMLElement; // 提取 target 属性
  console.log(element);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  } else {
    console.error("Element not found:", element);
  }
};
</script>
<style scoped>
.warp {
  background: url(~/image-10.png);
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
