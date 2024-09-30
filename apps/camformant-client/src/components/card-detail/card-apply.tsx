/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import { dateFormat, getRelativeTime } from "@/utils/date";
import { MdCalendarToday } from "react-icons/md";

interface CardApplyProps {
  profile?: string;
  name?: string;
  location?: string;
  job_opening?: string;
  deadline?: Date;
  createdAt?: Date;
}

export const CardApply: React.FC<CardApplyProps> = ({
  profile,
  name,
  location,
  deadline,
  job_opening,
  createdAt,
}) => {


  // Check if createdAt is a valid Date object
  const validCreatedAt =
    createdAt instanceof Date && !isNaN(createdAt.getTime());
    
  return (
    <div className="p-5 rounded-3xl bg-white shadow-md flex flex-col">
      <div className="flex justify-start gap-5 items-start ">
        <Image
          src={profile || ""}
          width={75}
          height={75}
          alt={name || "logo"}
          className="object-cover rounded-full drop-shadow-xl h-16 w-16"
        />
        <div className="flex flex-col gap-4 justify-center">
          <div>
            <h1 className=" text-secondary font-semibold text-base">{name}</h1>
            <p className="text-gray-400 text-xs pt-1">{location}</p>
          </div>
          <p className="text-gray-400 text-xs">{job_opening} Job Opening </p>
        </div>
      </div>
      <div className="flex justify-between mt-9">
        {deadline && (
          <span className=" flex text-red-500 items-center gap-2 text-xs">
            <MdCalendarToday />
            {dateFormat(deadline, "en-US")}
          </span>
        )}
        {validCreatedAt ? (
          <p className="text-gray-400 text-xs">{getRelativeTime(createdAt)}</p>
        ) : (
          <p className="text-gray-400 text-xs">No deadline provided</p>
        )}
      </div>
    </div>
  );
};
