<template>
  <div class="warp">
    <Theheader />
    <div class="inline-flex items-center justify-center w-full gold-text">
      {{ $route.params.id }}樓
    </div>
    <Floorlist />
    <RoomSelect @change="movetoid" />
    <AirCard :id="`id-${val}`" v-for="val in fakeroom()" />
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
// tmp fake data
const fakeroom = () => {
  let result = [];
  for (let i = 0; i < 30; i++) {
    result.push(i);
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
