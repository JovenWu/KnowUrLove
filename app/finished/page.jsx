"use client";
import React from "react";
import Confetti from "react-confetti";
import Above8 from "/public/assets/images/ABOVE8.png";
import Less8 from "/public/assets/images/LESS8.png";
import { useState, useEffect } from "react";
import unlock_3 from "/public/assets/images/unlock_3.svg";
import Image from "next/image";
import { useUsername } from "../context/UsernameContext";
import { useRouter } from "next/navigation";
function finished() {
  const { username, score} = useUsername();
  const [downloadLink, setDownloadLink] = useState('');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!username) {
      router.push("/");
    }
  }, [username, router]);
  if (!username) {
    return null;
  }

  useEffect(() => {
    setIsClient(true);
    if (score >= 8) {
        setDownloadLink(Above8.src);
      } else {
        setDownloadLink(Less8.src);
      }
    }, [score]);

  return (
    <div className="flex flex-col items-center max-w-xs mx-auto mt-8 overflow-hidden relative">
      {isClient && <Confetti numberOfPieces={100} gravity={0.05} />}
      <div className="text-center text-stone-600 text-2xl">Well Done!</div>
      <div className="text-stone-600 text-sm">You have cleared all stages.</div>
      <Image src={unlock_3} />
      <div className="text-center text-stone-600 text-2xl mt-10">
        Game is complete!
      </div>
      <div className="text-center text-stone-600 text-xs">
        click FINISH button to
        <br />
        download your result card
      </div>
      <div className="bg-[#5F5B50] rounded-3xl  justify-center items-center inline-flex mt-4">
        <a
          target="_blank"
          rel="noreferrer"
          download="KnowUrLove Result.png"
          href={downloadLink}
          className="text-center px-12 pt-2.5 pb-1.5 text-yellow-50 text-2xl"
        >
          FINISH
        </a>
      </div>
      <p className="text-center text-neutral-400 text-xs my-4">
        See you next time. Happy holidays!
      </p>
    </div>
  );
}

export default finished;
