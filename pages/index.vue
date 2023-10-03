<template>
  <Theheader />
  <div class="flex flex-col items-center">
    <div v-for="val in floorlist">
      <MainCard />
    </div>
  </div>
</template>
<script setup lang="ts">
import useStore from "~/store/index";
const store = useStore();
const countfloor = store.countfloor;
const floorlist = countfloor(store.floor);
console.log("floorlist", floorlist);
</script>
<style scoped>
body {
  height: 100%;
  width: 100%;
}
</style>
