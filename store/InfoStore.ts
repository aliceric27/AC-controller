import { defineStore, _ActionsTree, _GettersTree } from "pinia";
import { useRoute, useRouter } from "vue-router";
export interface State {
  floor: number;
  selectedfloor: null | number;
  selectedroom: null | string;
  roomStateMode: string;
  roomStateAuto: boolean;
  fanspeed: number;
  DeviceOnline: boolean;
  isDataUpdate: boolean;
  isFirstrun: boolean;
}
// 初始化資料
const initState: State = {
  // 樓層設定
  floor: 20,
  selectedfloor: null,
  selectedroom: null,
  roomStateMode: "wind",
  roomStateAuto: true,
  fanspeed: 3,
  DeviceOnline: true,
  isDataUpdate: false,
  isFirstrun: true,
};
// 相關fn
const actions: any = {
  // 計算樓層
  countfloor(floor: number): number[] {
    let result: number[] = [];
    if (floor) {
      for (let i = 1; i <= floor; i++) {
        result.push(i);
      }
      return result;
    } else return [];
  },
  // 樓層頁面跳轉
  turnfloor(floor: number, router: any): void {
    router.push({ path: `/room-page/` });
    console.log("turned");
  },
  changeSelectedfloor(floor: number): void {
    this.selectedfloor = floor;
    console.log("目前樓層", this.selectedfloor);
  },
  changeSelectedroom(room: string): void {
    this.selectedroom = room;
    console.log("目前房間", this.selectedroom);
  },
  setDataupdate(a: boolean): void {
    this.isDataUpdate = a;
  },
  setFirstrun(a: boolean): void {
    this.isFirstrun = a;
    console.log("isFirstrun", this.isFirstrun);
  },
};
const getters: _GettersTree<State> = {
  getfloor: (state) => actions.countfloor(state.floor),
};
const useInfoStore = defineStore("main", {
  state: () => initState,
  actions,
  getters,
});

export default useInfoStore;
