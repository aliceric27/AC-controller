<template>
  <!-- online card -->
  <div class="flex justify-center m-4" v-if="DeviceOnline">
    <div
      class="inline-flex flex-col items-start justify-center w-56 bg-green-300 shadow h-36 rounded-xl"
    >
      <!-- 上層房號 -->
      <div class="w-56 h-9 px-1.5 justify-between items-center inline-flex">
        <div
          class="w-28 h-11 p-1 text-orange-400 text-3xl font-bold font-['Microsoft JhengHei UI'] tracking-widest"
        >
          501房
        </div>
        <div
          class="w-14 h-9 text-right text-green-400 text-3xl font-bold font-['Microsoft JhengHei UI'] tracking-widest"
        >
          ON
        </div>
      </div>
      <!-- 中層室溫資訊 -->
      <div class="w-56 h-16 pl-0.5 justify-start items-end inline-flex">
        <div
          class="inline-flex jw-7 h-16 text-neutral-500 text-2xl font-bold font-['Microsoft JhengHei UI'] leading-relaxed"
        >
          室溫
        </div>
        <div
          class="inline-flex items-center w-20 h-16 text-neutral-500 text-5xl font-bold font-['Microsoft JhengHei UI']"
        >
          30
        </div>
        <div
          class="w-7 h-16 text-neutral-500 text-2xl font-bold font-['Microsoft JhengHei UI'] leading-relaxed"
        >
          設定
        </div>
        <div
          class="inline-flex items-center w-20 h-16 text-center text-neutral-500 text-5xl font-bold font-['Microsoft JhengHei UI']"
        >
          25
        </div>
      </div>
      <!-- 最底層資訊 -->
      <div class="inline-flex items-center justify-between w-56 h-12 px-2">
        <div class="relative w-12 h-12">
          <!-- 冷氣/送風/暖氣 -->
          <div class="flex w-12 h-12">
            <img class="p-2" :src="`/roomStateMode2/${WindMode}`" alt="mode" />
          </div>
        </div>
        <div class="justify-end items-center gap-0.5 flex">
          <div class="justify-start items-center gap-1.5 flex">
            <!-- 風扇模式 -->
            <div class="flex">
              <img :src="`/roomStateWind_Auto/${isWindauto}`" alt="noauto" />
            </div>
            <div
              class="text-neutral-500 text-xl font-bold font-['Microsoft JhengHei UI'] leading-relaxed"
            >
              Auto
            </div>
          </div>
          <!-- 風扇強度 -->
          <div class="">
            <img :src="`/roomStateWind3/${fanseed}`" alt="fanspeed" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- offline card -->
  <div
    v-else
    class="inline-flex flex-col items-start justify-center w-56 bg-[#424242] shadow h-36 rounded-xl"
  >
    <!-- top room -->
    <div class="w-56 h-9 px-1.5 justify-between items-center inline-flex">
      <div
        class="w-28 h-11 p-1 text-orange-400 text-3xl font-bold font-['Microsoft JhengHei UI'] tracking-widest"
      >
        501房
      </div>
    </div>
    <div class="w-56 h-28 p-1.5 justify-between items-center inline-flex">
      <div><img src="Vector_alert.svg" alt="" /></div>
      <div
        class="text-red-700 text-3xl font-bold font-['Microsoft JhengHei UI']"
      >
        設備離線
      </div>
      <div><img src="Vector_alert.svg" alt="" /></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useInfoStore from "~/store/index";
const store = useInfoStore();
const DeviceOnline = store.DeviceOnline;
const WindMode = computed(() => {
  switch (store.roomStateMode) {
    case "wind":
      return "roomStateMode-wind.png";
    case "hot":
      return "roomStateMode2-heating.png";
    case "cold":
      return "roomStateMode2-cool.png";
    default:
      return "roomStateMode-wind.png";
  }
});
const isWindauto = computed(() =>
  store.roomStateAuto
    ? "roomStateWind_Auto_Auto.png"
    : "roomStateWind_Auto_nonAuto.png"
);
const fanseed = computed(() => {
  switch (store.fanspeed) {
    case 0:
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
<style scoped></style>
