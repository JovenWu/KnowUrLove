"use client";

import { SetStateAction, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUsername } from "./context/UsernameContext"; // Adjust the path as needed
import Logo from "../public/assets/Logo.svg";
import leaderboardIcon from "/public/assets/images/leaderboard.svg";
import Link from "next/link";

export default function Home() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUsername } = useUsername();

  const click = () => {
    if (value.trim() === "") {
      setError("Username is required");
    } else {
      setError("");
      setUsername(value);
      router.push("/welcome");
    }
  };

  const onChange = (event: { target: { value: SetStateAction<string> } }) => {
    setValue(event.target.value);
    setError("");
  };

  return (
    <div className="flex flex-col items-center gap-4 px-4 max-w-xs mx-auto ">
      <Image src={Logo} alt="Logo" className="sm:mt-16 w-full" />
      <p className="text-center text-stone-600 ">
        Let’s see how good you are at understanding women
      </p>
      <div className="relative w-full">
        <input
          id="inputUsername"
          type="text"
          placeholder="Username"
          onChange={onChange}
          value={value}
          className="w-full h-12 bg-stone-700 px-5 py-1 rounded-xl text-white text-opacity-70 text-md"
          required
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <div className="text-center py-[1px] w-20 h-7 absolute top-[10px] right-3 bg-white rounded-xl">
          <button
            onClick={click}
            className="text-stone-700 w-full h-full py-0.5"
          >
            START
          </button>
        </div>
      </div>
        <Link href={"/leaderboard"} className="flex flex-row gap-2 bg-[#c2b29b] px-8 rounded-xl shadow-xl">Leaderboard <Image src={leaderboardIcon} width={20} height={20} alt="Leaderboard Icon"/></Link>
    </div>
  );
}
