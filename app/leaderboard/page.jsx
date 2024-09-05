"use server"
import Image from "next/image";
import leaderboardIcon from "/public/assets/images/leaderboard.svg";
import prisma from "@/app/lib/db";
import Link from "next/link";

const USERS_PER_PAGE = 5;
const MAX_VISIBLE_PAGES = 3;

export default async function Leaderboard({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  const users = await prisma.user.findMany({
    orderBy: [{ score: "desc" }, { createdAt: "asc" }],
    skip: (page - 1) * USERS_PER_PAGE,
    take: USERS_PER_PAGE,
  });

  const totalUsers = await prisma.user.count();
  const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);

  const getVisiblePages = (page, totalPages) => {
    let start = Math.max(1, page - Math.floor(MAX_VISIBLE_PAGES / 2));
    let end = Math.min(totalPages, start + MAX_VISIBLE_PAGES - 1);

    if (end - start < MAX_VISIBLE_PAGES) {
      start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <div className="flex flex-col items-center max-w-xs mx-auto mt-8">
      <div className="text-xl uppercase flex flex-row gap-2 item-center justify-center px-2 py-1">
        <p>leaderboard</p>
        <Image src={leaderboardIcon} width={20} alt="thropy icon" />
      </div>
      <div className="bg-[#c2b29b] rounded-xl mt-1.5 px-2.5 py-4 h-[302px] w-[320px]">
        {users.map((user, index) => (
          <div
            key={user.id}
            className="flex flex-row justify-between bg-[#ffffff] p-2 uppercase text-center rounded-md mb-2"
          >
            <div className="p-1 text-[#5F5B50]">
              {(page - 1) * USERS_PER_PAGE + index + 1}. {user.username}
            </div>
            <div className="bg-[#A0937D] rounded-full p-1 w-8 text-[#F8F2E3]">
              {user.score}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {page > 1 && (
          <a
            href={`?page=${page - 1}`}
            className="px-3 py-1 mx-1 bg-gray-200 rounded-full"
          >
            Prev
          </a>
        )}

        {visiblePages.map((pageNum) => (
          <a
            key={pageNum}
            href={`?page=${pageNum}`}
            className={`px-3 py-1 mx-1 ${
              pageNum === page ? "bg-gray-800 text-white" : "bg-gray-200"
            } rounded-full`}
          >
            {pageNum}
          </a>
        ))}

        {page < totalPages && (
          <a
            href={`?page=${page + 1}`}
            className="px-3 py-1 mx-1 bg-gray-200 rounded-full"
          >
            Next
          </a>
        )}
      </div>
      <Link href={"/"} className="flex flex-row gap-2 bg-[#c2b29b] px-8 rounded-xl shadow-xl mt-12">Home</Link>
    </div>
  );
}
