import { defineStore, _ActionsTree, _GettersTree } from "pinia";
import { io, Socket } from "socket.io-client";
export const useSocketStore = defineStore({
  id: "socketStore",
  state: () => ({
    isConnected: false,
    data: null,
    socket: null as Socket | null,
  }),
  actions: {
    initializeSocket(endpoint: string) {
      if (!import.meta.env.SSR) {
        if (!this.socket) {
          this.socket = io(endpoint);
          this.socket.on("connect", () => {
            this.isConnected = true;
            console.log("已連接到伺服器");
          });

          this.socket.on("tmsList", (data) => {
            this.data = data;
            console.log("message", data);
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
});
