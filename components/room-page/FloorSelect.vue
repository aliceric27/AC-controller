<template>
  <div class="inline-flex max-w-full overflow-auto divline">
    <div v-for="val in socketlist">
      <div class="inline-flex items-center gap-2">
        <div
          :class="{ 'floor-selected': val.floorNo === selectedfloor }"
          class="flex items-center justify-center floor"
          @click="turnfloor(val.floorNo)"
        >
          {{ val.floorNo }}F
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useInfoStore from "~/store/InfoStore";
import useSocketStore from "~/store/socketStore";
const InfoStore = useInfoStore();
const socketStore = useSocketStore();
const socketlist = computed(() => socketStore.floorList);
const router = useRouter();
const floorlist = InfoStore.getfloor;
const selectedfloor = computed(() => InfoStore.selectedfloor);
const turnfloor = (floor: number) => {
  InfoStore.changeSelectedfloor(floor);
  InfoStore.turnfloor(floor, router);
  InfoStore.setDataupdate(false);
  InfoStore.setFirstrun(true);
};
</script>

<style scoped>
.floor {
  width: 5rem;
  padding: 0.3125rem 1.25rem;
  gap: 0.625rem;
  border: 1px solid #c2a344;
  background: #fff;
  color: #c2a344;
  font-family: Microsoft JhengHei UI;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.09rem;
}
.floor:hover {
  width: 5rem;
  padding: 0.3125rem 1.25rem;
  gap: 0.625rem;
  border: 1px solid #c2a344;
  background: #c2a344;
  color: #ffffff;
  font-family: Microsoft JhengHei UI;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.09rem;
  cursor: pointer;
}
.floor-selected {
  width: 5rem;
  padding: 0.3125rem 1.25rem;
  gap: 0.625rem;
  border: 1px solid #c2a344;
  background: #c2a344;
  color: #fff;
  font-family: Microsoft JhengHei UI;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.09rem;
}
/* 
.floor:hover {
  cursor: pointer;
  width: 7.16669rem;
  padding: 0.3125rem 1.25rem;
  gap: 0.625rem;
  border: 1px solid #c2a344;
  background: #c2a344;
  color: #fff;
  font-family: Microsoft JhengHei UI;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.09rem;
} */
.divline {
  margin: 0 1rem;
  padding: 1rem 0;
  border-bottom: 2px solid#7171718f;
}
</style>
~/store/InfoStore
