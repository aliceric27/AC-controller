<template>
  <div class="sticky top-0 flex justify-center w-full">
    <select
      class="max-w-[17.5rem] w-full p-2 my-2 bg-[#cccccc] rounded-lg text-2xl font-bold bg-opacity-90"
      v-model="selectedFloor"
      @change="turnfloor(selectedFloor)"
    >
      <option value="1">{{ $t("pickfloor") }}</option>
      <option v-for="val in socketlist" :value="val.floorNo">
        {{ `${val.floorNo}F` }}
      </option>
    </select>
  </div>
</template>
<script setup lang="ts">
import useInfoStore from "~/store/InfoStore";
import useSocketStore from "~/store/socketStore";
const router = useRouter();
const socketStore = useSocketStore();
const InfoStore = useInfoStore();
const selectedFloor = ref(1); // 初始化'1'
const floorlist = InfoStore.getfloor;
const socketlist = computed(() => socketStore.floorList);
// 樓層跳轉
const turnfloor = (floor: number) => {
  InfoStore.changeSelectedfloor(floor);
  InfoStore.turnfloor(floor, router);
  selectedFloor.value = 1;
};
</script>
<style scoped></style>
