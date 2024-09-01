
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { useStatsStore } from "./state/store";

const Page = () => {
  const targetText =
    "Johnny, I got a lot of people here who are a little depressed because the war just ended. Please give me a new song. ";
  const initCounter=15
  const accuracy = useStatsStore((state) => state.accuarcy);
  const changeAccuracy = useStatsStore((state) => state.editAccuaracy);
  const changeWPm=useStatsStore((state)=>state.editWpm)
  const router = useRouter();
  const [text, setText] = useState("");
  const [counter, setCounter] = useState(initCounter);
 const getWordsWritten=()=>{
    const targetWords=targetText.split(" ")
    const writtenWords=text.split(" ")
    let correct=0
   writtenWords.map((word,index)=>{
      if ( word===targetWords[index]){
        correct+=1
      }
    })
       return correct; 
  }
  function getWpm(){
    console.log(getWordsWritten())
    return Math.floor(getWordsWritten()*60/initCounter)
  }
  const getAccuracy = useCallback(() => {
    let correct = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === targetText[i]) {
        correct += 1;
      }
    }
    return Math.floor((correct / text.length) * 100);
  }, [text, targetText]);

  useEffect(() => {
    if (counter==0){
      changeAccuracy(getAccuracy())
      changeWPm(getWpm())
      router.push('./pages/over/')
      return 

    }
     for(let i=0;i<initCounter;i++){
      setTimeout(()=>{
        setCounter(counter-1)
      },1000)
    }  
  },[counter])
  useEffect(() => {
    const handleTyping = (e: KeyboardEvent) => {
      const isAllowed =
        (e.keyCode >= 65 && e.keyCode <= 90) ||
        e.keyCode === 8 ||
        e.keyCode === 32 ||
        e.keyCode === 188 ||
        e.keyCode === 110;
      if (!isAllowed) {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      if (e.key === "Backspace") {
        setText((prevText) => prevText.slice(0, -1));
        return;
      }

      setText((prevText) => prevText + e.key);
    };

    window.addEventListener("keydown", handleTyping);
    return () => window.removeEventListener("keydown", handleTyping);
  }, [text]);

  return (
    <div className="flex flex-col justify-center items-center">
      <ul className="flex justify-center mx-auto p-10 items-center">
        {targetText.split("").map((element, index) => {
          let style = "";
          if (index === text.length) {
            style += "text-gray-500 bg-yellow-500 text-xl font-semiBold";
          } else if (text[index] == null) {
            style += "text-gray-500 text-xl font-semiBold";
          } else if (text[index] === element) {
            style += "text-xl text-white font-semiBold";
          } else {
            style += "text-red-500 text-xl font-semiBold";
          }
          if (element === " ") {
            return (
              <li className={style} key={index}>
                &nbsp;
              </li>
            );
          } else {
            return (
              <li className={style} key={index}>
                {element}
              </li>
            );
          }
        })}
      </ul>
      <p>{accuracy}</p>
      <p>{counter}</p>
      <button className="bg-blue-500 rounded-lg text-xl p-10 " onClick={()=>{console.log(getWordsWritten())}}>
        Get right words
      </button>
         </div>
  );
};

export default Page;

