"use client";
import React from "react";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUsername } from "../context/UsernameContext";
import Link from "next/link";
import Hi from "/public/assets/Hi.svg";

function Welcome() {
  const { username } = useUsername();
  const router = useRouter();

  useEffect(() => {
    if (!username) {
      router.push("/");
    }
  }, [username, router]);
  if (!username) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-2 px-4 max-w-xs mx-auto mt-12">
      <Image src={Hi} alt="Welcome" />
      <p className="uppercase text-stone-600 text-3xl">Hi, {username}</p>
      <p className="text-stone-600">
        Ready to unlock the secrets of female mind
      </p>
      <div className="text-white bg-stone-700 w-28 h-7 shadow text-center rounded-xl py-1">
        <button>
          <Link href='/stage_1'>LET’S START</Link></button>
      </div>
    </div>
  );
}

export default Welcome;
