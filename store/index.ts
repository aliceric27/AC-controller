import { defineStore, _ActionsTree, _GettersTree } from "pinia";
import { useRoute, useRouter } from "vue-router";

export interface State {
  floor: number;
}
// 初始化資料
const initState: State = {
  floor: 20,
};
// 相關fn
const actions: any = {
  countfloor(floor: number): number[] {
    let result: number[] = [];
    if (floor) {
      for (let i = 1; i <= floor; i++) {
        result.push(i);
      }
      return result;
    } else return [];
  },
  turnfloor(floor: number, router: Router): void {
    router.push({ path: `/room-page/${floor}` });
  },
};
const getters: _GettersTree<State> = {
  getTripleCount: (state) => actions.countfloor(state.floor),
};
const useInfoStore = defineStore("main", {
  state: () => initState,
  actions,
  getters,
});

export default useInfoStore;
