import { defineStore, _ActionsTree, _GettersTree } from "pinia";
import { useRoute, useRouter } from "vue-router";

export interface State {
  floor: number;
  selectedfloor: null | number;
  roomStateMode: string;
  roomStateWind: string;
  fanspeed: number;
}
// 初始化資料
const initState: State = {
  // 樓層設定
  floor: 20,
  selectedfloor: null,
  roomStateMode: "wind",
  roomStateWind: "auto",
  fanspeed: 3,
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
    router.push({ path: `/room-page/${floor}` });
  },
  changeSelectedfloor(floor: number): void {
    this.selectedfloor = floor;
    console.log("目前樓層", this.selectedfloor);
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
