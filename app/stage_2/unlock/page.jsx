import React from "react";
import Image from "next/image";
import unlock_2 from "/public/assets/images/unlock_2.svg";
import Link from "next/link";

function unlock() {

  return (
    <div className="flex flex-col items-center max-w-xs mx-auto mt-8">
      <p className="text-3xl text-[#5F5B50]">Congratulations!</p>
      <p className="text-[#0EA5E9] font-light">Level 2 unlocked</p>
      <Image src={unlock_2} alt="unlocked"/>
      <p className="text-2xl text-[#5F5B50] pt-4">Level 2</p>
      <p className="font-thin text-[#9E9E9E]">get into the story to solve the enigma</p>
      <Link href={"/stage_2"} className="bg-sky-500 rounded-3xl px-12 py-2 text-yellow-50 text-2xl my-4">continue</Link>
    </div>
  );
}

export default unlock;
