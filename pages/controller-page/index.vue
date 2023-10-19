<template>
  <div class="warp">
    <div>
      <Floorlist class="lg:hidden" />
      <RoomSelect class="lg:hidden" @change="movetoid" />
    </div>
    <FloorSelect class="hidden lg:flex" />
    <div>
      <AirConrtoller :roomNo="selectedroom" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import useInfoStore from "~/store/InfoStore";
const route = useRoute();
const InfoStore = useInfoStore();
const selectedroom = computed(() => InfoStore.selectedroom);
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
  height: 100dvh;
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
