import { create } from "zustand";
const axios=require('axios')
const APIKEY=process.env.NEXT_PUBLIC_API_KEY
const URL=`https://api.api-ninjas.com/v1/quotes?category=happiness&X-Api-Key=${APIKEY}`
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
interface phraseState{
  phrase:string;
  fetchPhrase:()=>Promise<string>
}
export const usePhraseStore=create<phraseState>((set)=>({
  phrase:"",
  fetchPhrase:async() =>{
    try{

    const response=await axios.get(URL)
    const phrase=response.data[0].quote
      set(()=>({phrase:phrase}))
    }catch(e){
      console.log(e)
      return "erro"
    }
    
   return "" 
  } 
}))
