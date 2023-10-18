<template>
  <div class="flex justify-center m-4 item-center warp">
    <div
      class="w-full max-w-xs p-4 mx-4 bg-white rounded-lg shadow-md lg:max-w-screen-lg"
    >
      <!-- Header - 637房 -->
      <div
        class="p-2 mb-4 text-5xl font-bold text-center bg-green-200 rounded-lg"
      >
        <p class="gold-room">{{ $route.params.id }}{{ $t("room") }}</p>
      </div>

      <!-- Temperature Controls -->
      <div
        class="flex flex-col mb-4 space-y-4 lg:grid lg:grid-cols-8 lg:gap-2 lg:space-y-0"
      >
        <!-- 室內溫度 -->
        <div class="p-4 text-center bg-gray-100 rounded-lg">
          <p class="mb-2">室內溫度</p>
          <p v-if="controller" class="text-2xl">
            {{ `${roomdata.nowTemp}°C` }}
          </p>
          <p v-else class="text-2xl">{{ `- -°C` }}</p>
        </div>

        <!-- 設定溫度 -->
        <div
          class="flex flex-col items-center justify-between p-4 bg-gray-100 rounded-lg"
        >
          <button class="flex justify-center w-full" @click="coolswitch('up')">
            <img
              v-if="controller"
              src="@svg/adjust_up.svg"
              alt="增加溫度"
              class="mb-2"
            />
          </button>
          <div class="text-center">
            <p class="mb-2">設定溫度</p>
            <div v-if="controller">
              <p class="text-2xl" v-if="!isTmpedit" @click="isTmpedit = true">
                {{ `${coolertmp}°C` }}
              </p>
              <input
                v-else
                type="number"
                v-model.lazy="coolertmp"
                @blur="isTmpedit = false"
                class="text-2xl"
                max="35"
                min="15"
                autofocus
              />
            </div>
            <p v-else class="text-2xl" v-if="!isTmpedit">
              {{ `- -°C` }}
            </p>
          </div>
          <button
            class="flex justify-center w-full"
            @click="coolswitch('down')"
          >
            <img
              v-if="controller"
              src="@svg/adjust_down.svg"
              alt="減少溫度"
              class="mt-2"
            />
          </button>
        </div>

        <!-- 模式 -->
        <div
          class="p-4 text-center bg-gray-100 rounded-lg"
          @click="coolermodeswitch(coolermode)"
        >
          <p class="mb-2">模式</p>
          <div></div>
          <div>
            <div v-if="controller" class="flex items-center justify-center">
              <img :src="`/roomStateMode2/${getmodepic('picurl')}`" alt="" />
            </div>
            <div v-if="controller">{{ getmodepic("text") }}</div>
            <div v-else>{{ "無" }}</div>
          </div>
        </div>
      </div>

      <!-- Wind controller -->
      <div
        class="flex items-center w-full h-12 p-2 my-2 space-x-4 border rounded-md bg-zinc-300 bg-opacity-30 border-neutral-200"
      >
        <!-- 風量文字描述 -->
        <div class="text-xl font-bold whitespace-nowrap text-neutral-500">
          風量
        </div>

        <!-- 風量下拉選單 -->
        <select
          v-model="fanspeedset"
          class="w-full p-2 text-sm font-bold text-black border-2 bg-neutral-100 rounded-2xl border-neutral-200 lg:text-2xl"
        >
          <option value="high" class="text-black" :selected="fanSpeedCheck(3)">
            強
          </option>
          <option
            value="medium"
            class="text-black bg-neutral-100"
            :selected="fanSpeedCheck(2)"
          >
            中
          </option>
          <option
            value="low"
            class="text-black bg-neutral-100"
            :selected="fanSpeedCheck(1)"
          >
            弱
          </option>
          <option
            value="auto"
            class="text-black bg-neutral-100"
            :selected="fanSpeedCheck(0)"
          >
            自動
          </option>
        </select>
      </div>
      <!-- Controls Row -->
      <!-- <div class="flex flex-col mb-4 space-y-2">
        <button class="w-full px-4 py-2 bg-green-300 rounded-lg">風速</button>
        <button class="w-full px-4 py-2 bg-gray-300 rounded-lg">定時</button>
        <button class="w-full px-4 py-2 bg-gray-300 rounded-lg">模式</button>
        <button class="w-full px-4 py-2 bg-gray-300 rounded-lg">省電</button>
      </div> -->

      <!-- Power Button -->
      <div class="text-center">
        <button
          @click="Controllerswitch"
          class="inline-flex items-center justify-center w-full px-6 py-2rounded-lg lg:grid lg:grid-cols-2"
        >
          <p class="m-2 lg:text-2xl">電源</p>
          <!-- ON -->
          <div
            v-if="controller"
            class="flex items-center justify-center h-8 bg-green-300 border-2 border-green-400 w-28 rounded-2xl lg:w-full lg:h-20"
          >
            <span class="text-lg font-bold tracking-widest text-white">ON</span>
          </div>
          <!-- OFF -->
          <div
            v-else
            class="flex items-center justify-center h-8 bg-[#e2e2e2] border-2 border-[#b4b4b4] w-28 rounded-2xl lg:w-full lg:h-20"
          >
            <span class="text-lg font-bold tracking-widest text-white"
              >OFF</span
            >
          </div>
        </button>
      </div>
      <!-- submit -->
      <div class="flex flex-col justify-center lg:grid lg:grid-cols-2">
        <div class="checkbtn" @click="() => sentemite()">確認</div>
        <div
          class="checkbtn"
          @click="() => router.push({ path: `/room-page/${floor}` })"
        >
          取消
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import roomup from "@svg/adjust_up.svg?component";
import roomdown from "@svg/adjust_down.svg?component";
import { useRouter } from "vue-router";
import useInfoStore from "~/store/InfoStore";
import useSocketStore from "~/store/socketStore";

const props = defineProps({
  //當前樓層資料
  roomNo: {
    required: true,
  },
});
const rData = ref({});

const socketStore = useSocketStore();
const InfoStore = useInfoStore();
const floor = InfoStore.selectedfloor;
const roomdata = computed(() =>
  socketStore.getRoomDataByFloor(floor, props.roomNo)
);
console.log("roomdata", roomdata.value);
const router = useRouter();
const fanspeedset: Ref<number> = ref(roomdata.value.fanSpeed);
const controller: Ref<boolean> = ref(roomdata.value.isWork);
const coolertmp: Ref<number> = ref(roomdata.value.setTemp);
const coolermode: Ref<number> = ref(roomdata.value.setMode);
const isTmpedit: Ref<boolean> = ref(false);

const Controllerswitch = (): void => {
  controller.value = !controller.value;
  console.log(controller.value);
};
const coolswitch = (command: string): void => {
  switch (command) {
    case "up":
      coolertmp.value++;
      break;
    case "down":
      coolertmp.value--;
      break;
  }
};
// 暫時寫法後續改用計算屬性
const coolermodeswitch = (mode: number) => {
  const allmode = [1, 2, 3];
  const currentIndex = allmode.indexOf(mode);
  if (currentIndex === -1) {
    console.error("提供的模式不在列表中");
    return;
  }

  if (currentIndex === allmode.length - 1) {
    coolermode.value = allmode[0];
    console.log(coolermode.value);
  } else {
    coolermode.value = allmode[currentIndex + 1];
    console.log(coolermode.value);
  }
};
// 暫時寫法，後續改用計算屬性
const getmodepic = (item: string) => {
  if (item === "picurl") {
    switch (coolermode.value) {
      case 1:
        return "roomStateMode2-cool.png";
      case 2:
        return "roomStateMode2-heating.png";
      case 3:
        return "roomStateMode-wind.png";
      default:
        return "roomStateMode2-cool.png";
    }
  } else if (item === "text") {
    switch (coolermode.value) {
      case 1:
        return "冷氣";
      case 2:
        return "暖氣";
      case 3:
        return "送風";
      default:
        return "冷氣";
    }
  }
};

const fanSpeedCheck = (checkitem: number) => {
  if (roomdata && checkitem) {
    const speednow = roomdata.value.fanSpeed;
    return speednow === checkitem;
  }
};

const sentemite = () => {
  if (InfoStore.selectedfloor) {
    console.log("ok");
    roomdata.value.isWork = controller.value;
    roomdata.value.setTemp = coolertmp.value;
    roomdata.value.setMode = coolermode.value;
    roomdata.value.fanSpeed = fanspeedset.value;
    socketStore.emitRoomdata(InfoStore.selectedfloor, roomdata.value);
    router.push({ path: `/room-page/${floor}` });
  }
};
</script>
<style scoped>
.checkbtn {
  display: flex;
  margin-top: 1rem;
  padding: 1rem;
  justify-content: center;
  width: 100%;
  border-radius: 2.6875rem;
  border: 1.5px solid #eaeaea;
  background: #fff;
  box-shadow: 1px 1px 2px 0px rgba(34, 34, 34, 0.1);
}
.gold-room {
  color: white;
  -webkit-text-stroke: 2px #cb9f62;
}
</style>
