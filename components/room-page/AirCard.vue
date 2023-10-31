<template>
  <!-- online card -->
  <div
    v-if="DeviceOnline !== 2"
    class="flex justify-center m-4 cursor-pointer btn-scale"
    @click="controllerPage(props.room.roomNo)"
  >
    <div
      class="inline-flex flex-col items-start justify-center w-56 shadow lg:w-48 h-36 rounded-xl"
      :class="{
        'bg-[#90FF9C]': DeviceOnline === 1,
        'bg-[#E2E2E2]': DeviceOnline === 0,
      }"
    >
      <!-- 上層房號 -->
      <div
        class="whitespace-nowrap w-full h-9 px-1.5 justify-between items-center inline-flex"
      >
        <div
          class="w-28 h-11 p-1 text-orange-400 text-3xl font-bold font-['Microsoft JhengHei UI'] tracking-widest"
        >
          {{ props.room.roomNo }}{{ $t("room") }}
        </div>
        <div
          v-if="DeviceOnline === 1"
          class="w-14 h-9 text-right text-green-400 text-3xl font-bold font-['Microsoft JhengHei UI'] tracking-widest stork-white"
        >
          ON
        </div>
        <div
          v-else
          class="stork-white m-2 w-14 h-9 text-right text-neutral-500 text-3xl font-bold font-['Microsoft JhengHei UI'] tracking-widest"
        >
          OFF
        </div>
      </div>
      <!-- 中層室溫資訊 -->
      <div class="w-full h-16 pl-0.5 justify-start items-end inline-flex">
        <div
          class="relative inline-flex jw-7 h-16 text-neutral-500 text-2xl font-bold font-['Microsoft JhengHei UI'] leading-relaxed"
        >
          {{ $t("roomtemperature") }}
        </div>
        <div
          v-if="DeviceOnline && props.room.nowTemp === 0"
          class="absolute lds-ring"
        >
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div
          v-else
          class="inline-flex items-center w-full h-16 text-neutral-500 text-3xl font-bold font-['Microsoft JhengHei UI']"
        >
          {{ DeviceOnline === 1 ? `${props.room.nowTemp}°c` : "--" }}
        </div>

        <div
          class="w-7 h-16 text-neutral-500 text-2xl font-bold font-['Microsoft JhengHei UI'] leading-relaxed"
        >
          {{ $t("settmp") }}
        </div>
        <div
          class="inline-flex items-center w-full h-16 text-center text-neutral-500 text-3xl font-bold font-['Microsoft JhengHei UI']"
        >
          {{ DeviceOnline === 1 ? `${props.room.setTemp}°c` : "--" }}
        </div>
      </div>
      <!-- 最底層資訊 -->
      <div class="inline-flex items-center justify-between w-full h-12 px-2">
        <div class="w-12 h-12">
          <!-- 冷氣/送風/暖氣 -->
          <div v-if="DeviceOnline === 1" class="flex w-12 h-12">
            <img class="p-2" :src="`/roomStateMode2/${WindMode}`" alt="mode" />
          </div>
        </div>
        <div
          v-if="DeviceOnline === 1"
          class="justify-end items-center gap-0.5 flex"
        >
          <div class="justify-start items-center gap-1.5 flex">
            <!-- 風扇模式 -->
            <div class="flex items-center">
              <img
                class="mx-2 roatefan"
                :src="`/roomStateWind_Auto/smallfan.png`"
                alt="noauto"
              />
              <p class="mr-2 font-bold" v-if="isWindauto">Auto</p>
            </div>
          </div>
          <!-- 風扇強度 -->
          <div class="">
            <img :src="`/roomStateWind3/${fanspeed}`" alt="fanspeed" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- offline card -->
  <div v-if="DeviceOnline === 2" class="flex justify-center m-4">
    <div
      class="flex flex-col justify-center w-56 lg:w-48 bg-[#424242] shadow h-36 rounded-xl"
    >
      <!-- top room -->
      <div
        class="w-56 h-9 px-1.5 justify-between items-center inline-flex whitespace-nowrap"
      >
        <div
          class="w-28 h-11 p-1 text-orange-400 text-3xl font-bold font-['Microsoft JhengHei UI'] tracking-widest"
        >
          {{ props.room.roomNo }}房
        </div>
      </div>
      <div class="inline-flex items-center justify-center w-full h-28">
        <div>
          <img src="@svg/Vector_alert.svg" alt="" />
          <!-- <Vectoralert types="vite-svg-loader" /> -->
        </div>
        <div
          class="text-red-700 text-3xl font-bold font-['Microsoft JhengHei UI']"
        >
          {{ $t("outline") }}
        </div>
        <div>
          <img src="@svg/Vector_alert.svg" alt="" />
          <!-- <Vectoralert types="vite-svg-loader" /> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import useInfoStore from "~/store/InfoStore";
const InfoStore = useInfoStore();
// const selectedroom = computed(() => InfoStore.selectedroom);
const changeSelectedroom = InfoStore.changeSelectedroom;
const router = useRouter();
const props = defineProps({
  //當前樓層資料
  room: {
    type: Object,
    required: true,
  },
});
const controllerPage = (room: string): void => {
  changeSelectedroom(room);
  router.push({ path: `/controller-page/` });
};
const DeviceOnline = computed(() => props.room.isWork);
const WindMode = computed(() => {
  switch (props.room.setMode) {
    case 3:
      return "roomStateMode-wind.png";
    case 2:
      return "roomStateMode2-heating.png";
    case 1:
      return "roomStateMode2-cool.png";
    default:
      return "roomStateMode-wind.png";
  }
});
const isWindauto = computed(() => props.room.isAuto);
const fanspeed = computed(() => {
  switch (props.room.fanSpeed) {
    case 4:
      return "roomStateWind3_non.png";
    case 1:
      return "roomStateWind3_weak.png";
    case 2:
      return "roomStateWind3_mid.png";
    case 3:
      return "roomStateWind3_gale.png";
    default:
      return "roomStateWind3_non.png";
  }
});
</script>
<style scoped>
@keyframes rotateAnimation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.roatefan {
  animation: rotateAnimation 2s linear infinite;
}
.lds-ring {
  display: flex;
  justify-items: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 4rem;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 2rem;
  height: 2rem;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.btn-scale {
  transition: transform 0.2s ease-in-out; /* 添加此行以設定平滑過渡 */
}
.btn-scale:hover {
  transform: scale(1.1);
}
.stork-white {
  -webkit-text-stroke: 0.5px #fff;
}
</style>
