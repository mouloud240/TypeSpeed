"use client"
import { statsState, useStatsStore } from "@/app/state/store"
import { useSearchParams } from "next/navigation"

const Page = () => {
  const searchParams=useSearchParams()
  const accuarcy=useStatsStore((state)=>state.accuarcy) 
  const wpm=useStatsStore((state)=>state.wpm)
  return (
    <div className="font-bold text-white text-xl flex flex-col justify-center items-center"> <div>
     accuarcy: {accuarcy}%
    </div>
      <div>
        wpm: {
          wpm
        }
      </div>
    </div>  )
}

export default Page
