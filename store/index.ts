import { defineStore, _ActionsTree, _GettersTree } from "pinia";
export interface State {
  floor: number;
}
const initState: State = {
  floor: 12,
};
const getters: _GettersTree<State> = {
  getTripleCount: (state) => state.floor * 3,
};
const useInfoStore = defineStore("main", {
  state: () => initState,
  actions: {
    countfloor(floor: number): number[] {
      let result: number[] = [];
      if (floor) {
        for (let i = 1; i <= floor; i++) {
          result.push(i);
        }
        return result;
      } else return [];
    },
  },
  getters,
});

export default useInfoStore;
