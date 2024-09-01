"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
const Page = () => {
  const targetText="Johnny, I got a lot of people here who are a little depressed because the war just ended. Please give me a new song. "
  const router=useRouter()
  const [text,SetText]=useState('')
  const [counter,Setcounter]=useState(60)
  const getAccuacy=()=>{
  let correct=0
    for (let i=0;i<text.length;i++){
      
      if (text[i]===targetText[i])
    {
        correct+=1
      }
    }

      return Math.floor((correct/text.length)*100);
  }
  useEffect(()=>{
    if (counter==0){
   router.push('./pages/over/')
    }
    setTimeout(()=>{
      Setcounter(counter-1)
    },1000)
  },[counter, router])
  useEffect(()=>{
      const HandelTyping=(e:KeyboardEvent)=>{
      const isAllowed=(e.keyCode>=65&&e.keyCode<=90)||(e.keyCode==8)||(e.keyCode==32)||(e.keyCode==188)||(e.keyCode==110)
      if (!isAllowed){
        e.preventDefault()
        return
        
      }
      e.preventDefault()
      if(e.key=="Backspace"){
        SetText(text.slice(0,-1))
        return 
      }
    
      SetText(text+e.key)}

    window.addEventListener("keydown",HandelTyping)
    return ()=>window.removeEventListener("keydown",HandelTyping);
  },[text])
  return (<div className="flex flex-col justify-center items-center">
    <ul className="flex justify-center mx-auto p-10 items-center  "> {
      targetText.split("").map((element,index)=>{
        let style:string=""
        if(index==text.length){
style+="text-gray-500 bg-yellow-500 text-xl font-semiBold"

        }
        else if (text[index]==null){
          style+="text-gray-500 text-xl font-semiBold"
        }else if (text[index]==element)
      {
          style+="text-xl font-semiBold"

         }else{
          style+="text-red-500 text-xl font-semiBold"
        }
        if (element==" "){
          return (<li  className={style} key={index}>&nbsp;</li>)
        }else {
          return (
            <li className={style} key={index} >{element}</li>
        )
        }
      })
    }
      </ul>
          <p>
        accuracy :{getAccuacy()}%
        </p>
    <p>
      {counter}
      </p>


 </div> )
}

export default Page 
