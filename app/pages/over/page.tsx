"use client"
import { statsState, useStatsStore } from "@/app/state/store"
import { useSearchParams } from "next/navigation"

const Page = () => {
  const searchParams=useSearchParams()
  const accuarcy=useStatsStore((state)=>state.accuarcy) 
  const wpm=useStatsStore((state)=>state.wpm)
  return (
    <div> <div>
      {accuarcy.toString()}
    </div>
      <div>
        wpm: {
          wpm
        }
      </div>
    </div>  )
}

export default Page
