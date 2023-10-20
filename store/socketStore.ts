import { defineStore, _ActionsTree, _GettersTree } from "pinia";
import { io, Socket } from "socket.io-client";
import mokerData from "./mockrData.json";
import useInfoStore from "./InfoStore";
import createReminderDialog from "~/components/controller-page/reminderDialog";
const reminderDialog = createReminderDialog();

interface Data {
  rData: {
    floorData: FloorData[];
    floorList: FloorList[];
  };
}

interface RoomData {
  fanSpeed: number | string;
  isAuto: number;
  isWork: number;
  nowTemp: number | string;
  roomNo: string;
  setMode: number;
  setTemp: number;
}

interface FloorData {
  floorNo: number;
  roomData: RoomData[];
}

interface FloorList {
  floorNo: number;
  offCount: number;
  offLine: number;
  onCount: number;
  roomCount: number;
  tooCool: number;
}

export interface State {
  isConnected: boolean;
  isMokemode: boolean;
  data: Ref<null | Data>;
  socket: null | Socket;
  floorData: Ref<FloorData[] | null>;
  floorList: Ref<FloorList[] | null>;
  mockData: Ref<Data>;
}
// 初始化資料
const initState: State = {
  isConnected: false,
  isMokemode: false,
  data: ref(null),
  socket: null,
  floorData: ref([]),
  floorList: ref([]),
  mockData: ref(mokerData),
};

const getters: _GettersTree<State> = {
  getRoomDataByFloor: (state) => (floorNo: number, roomNo?: string) => {
    const data = state.floorData?.find((data) => data.floorNo === floorNo);
    if (roomNo && data) {
      const raw = toRaw(data);
      const result = raw.roomData.find((val) => roomNo === val.roomNo);
      console.log("getRoomDataByFloor", result);
      return result;
    } else {
      //console.log("data", data);
      return data?.roomData || [];
    }
  },
};

const useSocketStore = defineStore({
  id: "socketStore",
  state: () => initState,
  actions: {
    async initializeSocket(endpoint: string) {
      if (!import.meta.env.SSR) {
        if (!this.socket) {
          if (import.meta.env.PROD) {
            this.socket = io();
          } else {
            this.socket = io(endpoint, {
              reconnection: false,
            });
          }
          this.socket.on("connect", () => {
            this.isConnected = true;
            console.log("Connected Socket Server!");
          });
          this.socket.on("connect_error", (error) => {
            // Notify the user
            // Use mock data if available
            if (import.meta.env.PROD) {
              console.error("Connection Error:", error);
            } else {
              this.data = this.mockData;
              const { floorData, floorList } = this.mockData.rData;
              this.floorData = floorData;
              this.floorList = floorList;
              this.isMokemode = true;
              console.log("MockData enable");
            }
          });

          this.socket.on("tmsList", (newData) => {
            console.log("Socket Data", newData);
            if (newData?.rData) {
              this.data = newData;
              const { floorData, floorList } = newData.rData;
              this.floorData = floorData;
              this.floorList = floorList;
            } else if (import.meta.env.DEV) {
              this.data = this.mockData;
              const { floorData, floorList } = this.mockData.rData;
              this.floorData = floorData;
              this.floorList = floorList;
              this.isMokemode = true;
              console.log("MockData enable");
            }
          });

          this.socket.on("disconnect", () => {
            this.isConnected = false;
          });
        }
      }
    },
    async emitRoomdata(floorNo: number, roomData: RoomData) {
      const InfoStore = useInfoStore();
      if (this.socket && this.isConnected) {
        // find room data to change
        const result = roomData;
        console.log("即將送出資料", result);
        const floorIndex: any = this.data?.rData.floorData.findIndex(
          (f) => f.floorNo === floorNo
        );
        const roomIndex = this.data?.rData.floorData[
          floorIndex
        ].roomData.findIndex((r) => r.roomNo === roomData.roomNo);
        if (this.data && floorIndex && roomIndex) {
          this.data.rData.floorData[floorIndex].roomData[roomIndex] = roomData;
        }
        if (result.isWork === 1) {
          let tmp = {
            roomNo: result.roomNo,
            nowTemp: result.nowTemp ? 1 : "- -",
            setTemp: result.setTemp,
            setMode: result.setMode,
            iscool: 0,
            isWork: 1,
            fanSpeed: result.fanSpeed,
            isAuto: result.fanSpeed === "A" ? 1 : 0,
          };
          console.log("送出的資料result", tmp);
          this.socket.emit("sendform", tmp);
        } else {
          this.socket.emit("sendform", result);
        }
        // console.log("foundroom", foundroom);
        reminderDialog.show(3, "資料修改成功", "#ff4500");
        console.log("Emitted value to server:", toRaw(this.data));
      } else {
        console.error("Socket is not connected. Cannot emit value.");
      }
    },
    async emitValue(value: Data, roomData?: RoomData) {
      if (this.socket && this.isConnected) {
        // this.socket.emit("sendform", value);
        console.log("Emitted value to server:", roomData);
      } else {
        console.error("Socket is not connected. Cannot emit value.");
      }
    },
    disconnectSocket() {
      if (this.socket) {
        this.socket.disconnect();
        this.socket = null;
        this.isConnected = false;
      }
    },
  },
  getters,
});

export default useSocketStore;
