"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BiChat } from "react-icons/bi";

export default function Chat({ className = "" }: ChatProps) {
  const router = usePathname();

  const [getRoute, setGetroute] = useState<boolean>();

  useEffect(() => {
    const parts = router.split("/");
    const lastPart = parts[parts.length - 1];
    if (router === "/") {
      setGetroute(false);
    } else if (
      lastPart === "message" ||
      lastPart === "chat" ||
      !isNaN(Number(lastPart))
    ) {
      setGetroute(true);
    } else {
      setGetroute(false);
    }
  }, [router]);

  return (
    <Link href="/chat">
      <div
        className={` ${getRoute ? "hidden" : "flex"} z-20  bg-t-bg-ellipse-16add flex flex-col items-center justify-center bg-cover bg-center py-3 pl-[13px] pr-3 ${className}`}
      >
        <div className=" flex rounded-full  ">
          <div className="h-full w-full flex-shrink-0 overflow-clip rounded-full bg-orange-400 p-3 flex items-center justify-center">
            <BiChat className="h-5 w-5 text-white " />
          </div>
        </div>
      </div>
    </Link>
  );
}

interface ChatProps {
  className?: string;
}
