import { create } from "zustand";
//pushed correctly
export interface statsState {
  accuarcy: number;
  wpm: number;
}
interface storeState {
  accuarcy: number;
  wpm: number;
  editAccuaracy:(accuarcy:number)=>void ;
  editWpm:(wpm:number)=>void;
}

const init: statsState = {
  accuarcy: 0,
  wpm: 0,
};

export const useStatsStore = create<storeState>((set) => ({
  accuarcy: init.accuarcy,
  wpm: init.wpm,
  editAccuaracy: (Naccuarcy:number) => set(()=>({accuarcy:Naccuarcy})),
  editWpm:(nWpm:number)=>set(()=>({wpm:nWpm}))

}));

export type storeType = ReturnType<typeof useStatsStore>;
