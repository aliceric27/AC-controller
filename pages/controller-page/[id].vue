<template>
  <div class="warp">
    <Floorlist />
    <RoomSelect @change="movetoid" />
    <AirConrtoller :roomNo="$route.params.id" />
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();

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
