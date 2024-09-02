"use client"
import { statsState, useStatsStore } from "@/app/state/store"
import Link from "next/link"

const Page = () => {
  const accuarcy=useStatsStore((state)=>state.accuarcy) 
  const wpm=useStatsStore((state)=>state.wpm)
  return (
    <div className="font-bold text-white text-xl mt-20 flex flex-col justify-center items-center"> <div>
     accuarcy: {accuarcy}%
    </div>
      <div>
        wpm: {
          wpm
        }
      </div>
      <Link href={"/"}>
        <button className="flex justify-center bg-red-500 rounded-xl text-xl text-white p-4 mt-5 ">
          Go home
        </button>
      </Link>
    </div>  )
}

export default Page
