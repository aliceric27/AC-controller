<template>
  <div class="m-2 border warp">
    <div class="border cursor-pointer warp-in">
      <div class="flex justify-between border warp-top">
        <p class="gold-text">{{ props.floor }}F</p>
        <div>
          <div class="flex m-2">
            <img src="house-door.svg" alt="" />
            <p class="grey-text">房數{{ 1 + 2 }}</p>
          </div>
        </div>
      </div>
      <div class="border warp-bottom">
        <div class="flex">
          <img class="mx-2" src="power.svg" alt="關機" />
          <p class="inline-block mx-2 text-2xl grey-text">
            {{ $t("turnoff") }}
          </p>
          <span class="text-2xl grey-text">0</span>
        </div>
        <div class="flex">
          <img class="mx-2" src="Vector_alert.svg" alt="離線" />
          <p class="inline-block mx-2 text-2xl grey-text">
            {{ $t("offline") }}
          </p>
          <span class="text-2xl grey-text">1</span>
        </div>
        <div class="flex">
          <img class="mx-2" src="vector.svg" alt="低溫" />
          <p class="inline-block mx-2 grey-text">{{ $t("lowtmp") }}</p>
          <span class="text-2xl grey-text">3</span>
        </div>
        <div class="flex">
          <div class="mx-2 w-[1.625rem] h-[1.625rem]">
            <img src="modeicon.svg" alt="運轉" />
          </div>
          <p class="inline-block mx-2 grey-text">
            {{ $t("online") }}
          </p>
          <span class="text-2xl grey-text">3</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  //當前樓層資料
  floor: {
    type: Number,
    required: true,
  },
});
</script>
<style scoped>
.warp {
  width: 17.5rem;
  height: max-content;
  background-color: aliceblue;
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
