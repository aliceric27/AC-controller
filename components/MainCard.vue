<template>
  <div class="m-2 maincard-warp">
    <div class="border rounded-md cursor-pointer">
      <div class="flex justify-between warp-top">
        <p class="gold-text">{{ props.floor }}F</p>
        <div>
          <div class="flex m-2">
            <img src="@svg/housedoor.svg" alt="" />
            <p class="grey-text">
              {{ $t("totalroom") }}{{ floorlist.roomCount }}
            </p>
          </div>
        </div>
      </div>
      <div class="warp-bottom">
        <div class="flex">
          <img class="mx-2" src="@svg/power.svg" alt="關機" />
          <p class="inline-block mx-2 text-2xl grey-text">
            {{ $t("turnoff") }}
          </p>
          <span class="text-2xl grey-text">{{ floorlist.offCount }}</span>
        </div>
        <div class="flex">
          <img class="mx-2" src="@svg/Vector_alert.svg" alt="離線" />
          <p class="inline-block mx-2 text-2xl grey-text">
            {{ $t("offline") }}
          </p>
          <span class="text-2xl grey-text">{{ floorlist.offLine }}</span>
        </div>
        <div class="flex">
          <img class="mx-2" src="@svg/vector.svg" alt="低溫" />
          <p class="inline-block mx-2 grey-text">{{ $t("lowtmp") }}</p>
          <span class="text-2xl grey-text">{{ floorlist.tooCool }}</span>
        </div>
        <div class="flex">
          <div class="mx-2 w-[1.625rem] h-[1.625rem]">
            <img src="@svg/modeicon.svg" alt="運轉" />
          </div>
          <p class="inline-block mx-2 grey-text">
            {{ $t("online") }}
          </p>
          <span class="text-2xl grey-text">{{ floorlist.onCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useSocketStore from "~/store/socketStore";
const socketStore = useSocketStore();
const props = defineProps({
  //當前樓層資料
  floor: {
    type: Number,
    required: true,
  },
});
const floorlist = computed(() =>
  socketStore.floorList.find((list) => list.floorNo === props.floor)
);
</script>
<style scoped>
.maincard-warp {
  width: 17.5rem;
  height: max-content;
  background-color: #fff;
}
.grey-text {
  color: #717171;
  font-family: Microsoft JhengHei UI;
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.2rem;
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
