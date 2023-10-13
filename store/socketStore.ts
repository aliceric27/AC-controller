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
  getRoomDataByFloor: (state) => (floorNo: number) => {
    const data = state.floorData?.find((data) => data.floorNo === floorNo);
    console.log("data", data);
    return data?.roomData || [];
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
