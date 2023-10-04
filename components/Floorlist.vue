<template>
  <div class="sticky top-0 flex justify-center w-full">
    <select
      class="max-w-[17.5rem] w-full p-2 my-2 bg-[#cccccc] rounded-lg text-2xl font-bold bg-opacity-90"
      v-model="selectedFloor"
      @change="turnfloor(selectedFloor)"
    >
      <option value="1">{{ $t("pickfloor") }}</option>
      <option v-for="val in floorlist" :value="val">
        {{ `${val}F` }}
      </option>
    </select>
  </div>
</template>
<script setup lang="ts">
import useInfoStore from "~/store/index";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const store = useInfoStore();
const selectedFloor = ref(1); // 初始化'1'
const floorlist = store.getfloor;
// 樓層跳轉
const turnfloor = (floor: number) => {
  store.changeSelectedfloor(floor);
  store.turnfloor(floor, router);
};
</script>
<style scoped></style>
