<template>
  <div class="inline-flex max-w-full overflow-auto">
    <div v-for="val in floorlist">
      <div class="inline-flex items-center gap-2">
        <div
          :class="{ 'floor-selected': val === selectedfloor }"
          class="flex items-center justify-center floor"
        >
          {{ val }}F
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useInfoStore from "~/store/InfoStore";
const InfoStore = useInfoStore();
const floorlist = InfoStore.getfloor;
const selectedfloor = InfoStore.selectedfloor;
</script>

<style scoped>
.floor {
  width: 7.16669rem;
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
.floor-selected {
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
</style>
~/store/InfoStore
