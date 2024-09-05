import React from "react";
import Image from "next/image";
import Link from "next/link";
import unlock_3 from "/public/assets/images/unlock_3.svg";

function unlock() {

  return (
    <div className="flex flex-col items-center max-w-xs mx-auto mt-8">
      <p className="text-3xl text-[#5F5B50]">Congratulations!</p>
      <p className="text-[#245931] font-light">Level 3 unlocked</p>
      <Image src={unlock_3} />
      <p className="text-2xl text-[#5F5B50] pt-4">Level 3</p>
      <p className="font-thin text-[#9E9E9E] text-center">
        understanding women's emotions to infinity and beyond!
      </p>
      <Link
        href={"/stage_3"}
        className="bg-[#358647] rounded-3xl px-12 py-2 text-yellow-50 text-2xl my-4"
      >
        continue
      </Link>
    </div>
  );
}

export default unlock;
