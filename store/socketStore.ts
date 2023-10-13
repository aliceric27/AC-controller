import { defineStore, _ActionsTree, _GettersTree } from "pinia";
import { io, Socket } from "socket.io-client";
import useInfoStore from "./InfoStore";

interface Data {
  rData: {
    floorData: [];
    floorList: [];
  };
}

interface RoomData {
  fanSpeed: number;
  isAuto: number;
  isWork: number;
  nowTemp: number;
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
  data: Ref<null | Data>;
  socket: null | Socket;
  floorData: Ref<FloorData[] | null>;
  floorList: Ref<FloorList[] | null>;
}
// 初始化資料
const initState: State = {
  isConnected: false,
  data: ref(null),
  socket: null,
  floorData: ref([]),
  floorList: ref([]),
};

const getters: _GettersTree<State> = {
  getRoomDataByFloor: (state) => (floorNo: number, roomNo?: string) => {
    const data = state.floorData?.find((data) => data.floorNo === floorNo);
    if (roomNo && data) {
      const raw = toRaw(data);
      console.log("data 尋找到的資料raw", raw);
      const result = raw.roomData.find((val) => roomNo === val.roomNo);
      console.log("return結果", result);
      return result;
    } else {
      // console.log("data", data);
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
          this.socket = io(endpoint);
          this.socket.on("connect", () => {
            this.isConnected = true;
            console.log("Connected Socket Server!");
          });
          this.socket.on("tmsList", (newData) => {
            console.log("Socket Data", newData);
            this.data = newData;
            const { floorData, floorList } = newData.rData;
            this.floorData = floorData;
            this.floorList = floorList;
          });

          this.socket.on("disconnect", () => {
            this.isConnected = false;
          });
        }
      }
    },
    async emitRoomdata(floorNo: number, roomData: RoomData) {
      if (this.socket && this.isConnected) {
        // find room data to change
        let foundroom = this.getRoomDataByFloor(floorNo, roomData.roomNo);

        console.log("foundroom", foundroom);
        // this.socket.emit("sendform", roomData);
        // console.log("Emitted value to server:", roomData);
      } else {
        console.error("Socket is not connected. Cannot emit value.");
      }
    },
    async emitValue(value: Data, roomData?: RoomData) {
      if (this.socket && this.isConnected) {
        this.socket.emit("sendform", value);
        console.log("Emitted value to server:", value);
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
