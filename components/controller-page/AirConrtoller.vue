<template>
  <div class="flex justify-center m-4 item-center warp">
    <div
      class="w-full max-w-xs p-4 mx-4 bg-white rounded-lg shadow-md lg:max-w-screen-lg"
    >
      <!-- Header - 637房 -->
      <div
        class="p-2 mb-4 text-5xl font-bold lg:grid lg:grid-cols-3 text-centerrounded-lg"
        :class="{ 'bg-green-200': controller, 'bg-[#e2e2e2]': !controller }"
      >
        <div></div>
        <p class="text-center gold-room">{{ selectedroom }}{{ $t("room") }}</p>
        <!-- Power Button -->
        <div class="text-center">
          <button
            @click="Controllerswitch"
            class="inline-flex items-center justify-center w-full px-6 py-2rounded-lg lg:grid lg:grid-cols-2"
          >
            <p class="hidden my-2 lg:block lg:text-2xl">電源</p>
            <!-- ON -->
            <div
              v-if="controller"
              class="flex items-center justify-center w-20 h-8 bg-green-300 border-2 border-green-400 rounded-2xl lg:w-1/2 lg:h-2/3"
            >
              <span class="text-lg font-bold tracking-widest text-white"
                >ON</span
              >
            </div>
            <!-- OFF -->
            <div
              v-else
              class="flex items-center justify-center h-8 bg-[#e2e2e2] border-2 border-[#b4b4b4] w-28 rounded-2xl lg:w-1/2 lg:h-2/3"
            >
              <span class="text-lg font-bold tracking-widest text-white"
                >OFF</span
              >
            </div>
          </button>
        </div>
      </div>

      <!-- Temperature Controls -->
      <div
        class="flex flex-col items-center mb-4 space-y-4 lg:grid lg:grid-cols-3 lg:gap-2 lg:space-y-0"
      >
        <!-- 室內溫度 -->
        <div
          class="flex flex-col items-center justify-center w-full h-full p-4 text-center bg-gray-100 rounded-lg"
        >
          <p class="mb-2">室內溫度</p>
          <p v-if="controller" class="text-2xl">
            {{ `${roomdata.nowTemp}°C` }}
          </p>
          <p v-else class="text-2xl">{{ `- -°C` }}</p>
        </div>

        <!-- 設定溫度 -->
        <div
          class="flex flex-col items-center justify-between w-full h-full p-4 bg-gray-100 rounded-lg"
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
          class="flex flex-col justify-center w-full h-full p-4 text-center bg-gray-100 rounded-lg cursor-pointer"
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
        v-if="controller"
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
          <option value="3" class="text-black" :selected="fanSpeedCheck('3')">
            強
          </option>
          <option
            value="2"
            class="text-black bg-neutral-100"
            :selected="fanSpeedCheck('2')"
          >
            中
          </option>
          <option
            value="1"
            class="text-black bg-neutral-100"
            :selected="fanSpeedCheck('1')"
          >
            弱
          </option>
          <option
            value="A"
            class="text-black bg-neutral-100"
            :selected="fanSpeedCheck('A')"
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

      <!-- submit -->
      <div class="flex flex-col justify-center lg:grid lg:grid-cols-2">
        <div
          class="cursor-pointer checkbtn"
          :class="{ dataupdate: isDataupdate }"
          @click="() => sentemite()"
        >
          確認
        </div>
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

const socketStore = useSocketStore();
const InfoStore = useInfoStore();
const floor = InfoStore.selectedfloor;
const selectedroom = computed(() => InfoStore.selectedroom);
const roomdata = ref(
  computed(() => socketStore.getRoomDataByFloor(floor, selectedroom.value))
);
const router = useRouter();
const fanspeedset = ref(roomdata.value.fanSpeed);
const controller: Ref<boolean> = ref(roomdata.value.isWork);
const coolertmp: Ref<any> = ref(roomdata.value.setTemp);
const coolermode: Ref<number> = ref(roomdata.value.setMode);
const isTmpedit: Ref<boolean> = ref(false);
const isDataupdate = computed(() => InfoStore.isDataUpdate);
const isFirstRun = computed(() => InfoStore.isFirstrun);
const setFirstrun = InfoStore.setFirstrun;
const setUpdate = InfoStore.setDataupdate;
const localrData = reactive({
  fanspeedset,
  controller,
  coolertmp,
  coolermode,
  nowTemp: "- -",
});

const Controllerswitch = (): void => {
  setUpdate(true);
  controller.value = !controller.value;
  console.log(controller.value);
};
const coolswitch = (command: string): void => {
  switch (command) {
    case "up":
      coolertmp.value++;
      setUpdate(true);
      break;
    case "down":
      coolertmp.value--;
      setUpdate(true);
      break;
  }
};
// 暫時寫法後續改用計算屬性
const coolermodeswitch = (mode: number) => {
  setUpdate(true);
  const allmode = [1, 2, 3];
  const currentIndex = allmode.indexOf(mode);
  // if (currentIndex === -1) {
  //   console.error("提供的模式不在列表中");
  //   return;
  // }

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

const fanSpeedCheck = (checkitem: String) => {
  if (roomdata && checkitem) {
    if (!isFirstRun) setUpdate(true);
    const speednow = roomdata.value.fanSpeed;
    return speednow === checkitem;
  }
};

const checkDatavaild = () => {
  if (roomdata.value.isWork !== 0 && roomdata.value.isWork !== 1) {
    if (roomdata.value.isWork === 1) {
      if (!roomdata.value.setTemp) {
        window.alert("溫度設定錯誤");
        return false;
      }
      if (!roomdata.value.setMode) {
        window.alert("模式設定錯誤");
        return false;
      }
      if (roomdata.value.fanSpeed) {
        let a = roomdata.value.fanSpeed;
        if (a !== "A" || a !== "3" || a !== "2" || a !== "1")
          window.alert("轉速設定錯誤");
        return false;
      }
    }
    console.log(roomdata.value.isWork);
    window.alert("isWork not set");
    return false;
  }
  return true;
};

const sentemite = () => {
  if (InfoStore.selectedfloor) {
    roomdata.value.isWork = controller.value ? 1 : 0;
    roomdata.value.setTemp = coolertmp.value;
    roomdata.value.setMode = coolermode.value;
    roomdata.value.fanSpeed = fanspeedset.value;
    roomdata.value.isAuto === "A"
      ? (roomdata.value.isAuto = 1)
      : (roomdata.value.isAuto = 0);
    if (checkDatavaild()) {
      socketStore.emitRoomdata(InfoStore.selectedfloor, roomdata.value);
      router.push({ path: `/room-page/` });
    }
  }
};
watch(
  () => InfoStore.selectedroom,
  (newVal) => {
    if (newVal) {
      socketStore.getRoomDataByFloor(floor, selectedroom.value);
      fanspeedset.value = roomdata.value.fanSpeed;
      controller.value = roomdata.value.isWork;
      coolertmp.value = roomdata.value.setTemp;
      coolermode.value = roomdata.value.setMode;
    }
  }
);

watch(
  () => localrData,
  (newVal, oldVal) => {
    if (newVal.controller && isFirstRun) {
      if (!newVal.coolertmp) newVal.coolertmp = "25";
      if (!newVal.fanspeedset || newVal.fanspeedset === 4)
        newVal.fanspeedset = "A";
      if (!newVal.coolermode) newVal.coolermode = 1;
      if (!newVal.nowTemp) roomdata.value.nowTemp = "- -";
      roomdata.value.iscool = 0;
      setFirstrun(false);
      return;
    }
    console.log("data changed");
  },
  { deep: true, immediate: true }
);
</script>
<style scoped>
@keyframes scaleAnimation {
  0% {
    transform: scale(1);
    background: initial;
  }
  50% {
    transform: scale(1.05);
    background: #0cdc1af3;
  }
  100% {
    transform: scale(1);
    background: initial;
  }
}
.dataupdate {
  animation: scaleAnimation 1s ease infinite;
  background: #0cdc1af3;
}
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
