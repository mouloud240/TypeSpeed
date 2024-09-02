
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { usePhraseStore, useStatsStore } from "./state/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const Page = () => {
  const targetText = usePhraseStore((state) => state.phrase);
  const [initCounter,setInitCounter]=useState(10000)
  const fetchPhrase = usePhraseStore((state) => state.fetchPhrase);
  
  const changeAccuracy = useStatsStore((state) => state.editAccuaracy);
  const changeWPm = useStatsStore((state) => state.editWpm);
  const router = useRouter();
  const [text, setText] = useState("");
  const [counter, setCounter] = useState(initCounter);
  const [phraseGenerated, setPhraseGenerated] = useState(false);

  const getWordsWritten = useCallback(() => {
    const targetWords = targetText.split(" ");
    const writtenWords = text.split(" ");
    let correct = 0;
    writtenWords.forEach((word, index) => {
      if (word === targetWords[index]) {
        correct += 1;
      }
    });
    return correct;
  }, [targetText, text]);

  const getWpm = useCallback(() => {
    return Math.floor((getWordsWritten() * 60) / (initCounter - counter));
  }, [counter, getWordsWritten, initCounter]);

  const getAccuracy = useCallback(() => {
    if (text.length==0){
      return 0
    }
    let correct = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === targetText[i]) {
        correct += 1;
      }
    }
    return Math.floor((correct / text.length) * 100);
  }, [text, targetText]);

  const handleRestart = useCallback(async () => {
    await fetchPhrase();
    setText("");
    setCounter(initCounter);
    setPhraseGenerated(true);
  }, [fetchPhrase, initCounter]);

  useEffect(() => {
    if (phraseGenerated) {
      const intervalId = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [phraseGenerated]);

  useEffect(() => {
    handleRestart();
  }, [handleRestart]);

  useEffect(() => {
    if (text.length === targetText.length && text.length !== 0) {
      changeAccuracy(getAccuracy());
      changeWPm(getWpm());
      router.push("./pages/over/");
      return;
    }

    if (counter === 0) {
      changeAccuracy(getAccuracy());
      changeWPm(getWpm());
      router.push("./pages/over/");
      return;
    }
  }, [changeAccuracy, changeWPm, counter, getAccuracy, getWpm, router, targetText.length, text.length]);

  useEffect(() => {
    const handleTyping = (e: KeyboardEvent) => {
      const isAllowed =
        (e.keyCode >= 65 && e.keyCode <= 90) ||
        e.keyCode === 8 ||
        e.keyCode === 32 ||
        e.keyCode === 188 ||
        e.keyCode === 110||
      e.keyCode===52

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
    <div className="flex flex-col justify-center items-center h[100vh]">
      <h1 className="mb-12 text-5xl mt-12 text-yellow-500 font-bold mx-auto">
        Welcome To speed Type
      </h1>
      <Select  onValueChange={(value)=>{setInitCounter(parseInt(value))}} >
  <SelectTrigger className="text-white w-[200px] h-12 bg-yellow-500">
          
          



    <SelectValue placeholder="Timer" />
  </SelectTrigger>
  <SelectContent className="text-xl font-semibold bg-yellow-300 text-white">
    <SelectItem className="" value="15">15 s</SelectItem>
    <SelectItem value="30">30 s</SelectItem>
    <SelectItem value="60">60 s</SelectItem>
  </SelectContent>
</Select>

      <ul className="flex flex-wrap p-10 w-[40%] h-full">
        {targetText.split("").map((element, index) => {
          let style = "";
          if (index === text.length) {
            style += "text-gray-500 bg-yellow-500 text-3xl font-semiBold";
          } else if (text[index] == null) {
            style += "text-gray-500 text-3xl font-semiBold";
          } else if (text[index] === element) {
            style += "text-3xl text-white font-semiBold";
          } else {
            style += "text-red-500 text-3xl font-semiBold";
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
      <p className="text-xl font-bold text-white mx-auto">{counter}</p>

      <button className="text-white bg-yellow-500 rounded-xl p-4 mt-4 text-3xl" onClick={handleRestart}>
        Restart + New Phrase
      </button>
    </div>
  );
};

export default Page;

