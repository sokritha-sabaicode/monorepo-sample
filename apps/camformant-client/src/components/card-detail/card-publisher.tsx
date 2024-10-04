import React from "react";
import Image from "next/image";
import logo1 from "@/../../public/images/logo.png";
import { profile } from "console";

export interface CardCompanyProps {
  profile?: string;
  name?: string;
  bio?: string;
  phone_number?: string;
  email?: string;
}

export const JobPublisher: React.FC<CardCompanyProps> = ({
  name,
  bio,
  phone_number,
  email,
  profile,
}) => {
  return (
    <div className="container rounded-3xl bg-white drop-shadow-lg">
      <h1 className="font-semibold text-sm">Job Publisher</h1>
      <div className="grid grid-cols-4 gap-2 pt-4">
        <div className="col-span-1">
          <Image
            src={profile || ""}
            width={75}
            height={75}
            alt={name || "logo"}
            className="object-cover rounded-full drop-shadow-xl h-16 w-16"
          />
        </div>
        <div className="col-span-3">
          <div className="flex text-xs flex-col gap-5">
            <div>
              <h1 className="text-sm font-semibold">{name} </h1>
              <p className="text-gray-400 pt-1">{bio}</p>
            </div>
            <div className="text-xs pb-3">
              <h1>{phone_number} </h1>
              <p className="pt-1">{email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
