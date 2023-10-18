<template>
  <div class="sticky flex justify-center w-full top-14">
    <select
      class="max-w-[17.5rem] w-full p-2 my-2 bg-[#cccccc] rounded-lg text-2xl font-bold bg-opacity-90"
      v-model="optionval"
      @change="handleChange"
    >
      <option value="1">{{ $t("pickroom") }}</option>
      <option v-for="val in floorlist" :value="val.roomNo">
        {{ `${val.roomNo}${$t("room")}` }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
interface RoomData {
  fanSpeed: number;
  isAuto: number;
  isWork: number;
  nowTemp: number;
  roomNo: string;
  setMode: number;
  setTemp: number;
}
import useInfoStore from "~/store/InfoStore";
import useSocketStore from "~/store/socketStore";
const router = useRouter();
const optionval: Ref<number | string> = ref(1);
const socketStore = useSocketStore();
const InfoStore = useInfoStore();
const floorlist = socketStore.getRoomDataByFloor(InfoStore.selectedfloor);
const floor = InfoStore.selectedfloor;
const changeSelectedroom = InfoStore.changeSelectedroom;
const selectedroom = computed(() => InfoStore.selectedroom);
console.log("floorlist", floorlist);
const emit = defineEmits(["change"]);
const handleChange = (event: Event) => {
  if (typeof selectedroom !== "number") {
    const roomchangedto = toRaw(optionval.value);
    changeSelectedroom(roomchangedto);
    router.push({ path: `/controller-page/` });
    console.log("changeoptionval", roomchangedto);
    optionval.value = 1;
  }
};
const roomlist = () => {
  let result = [];
  for (let i = 501; i < 520; i++) {
    result.push(i);
  }
  return result;
};
</script>

<style scoped></style>
