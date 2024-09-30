import React from "react";
import Image from "next/image";
import Link from "next/link";

interface typeProfile {
  pic?: string | File;
  rating?: number;
  username: string | null;
}

const ProfileRating: React.FC<typeProfile> = ({ pic, rating, username }) => {
  return (
    <div
      className=" w-full p-8
     shadow-slate-100 shadow-md
      bg-white rounded-se-2xl 
      rounded-ss-2xl flex justify-center 
      flex-col gap-3
      "
    >
      <div className=" container flex gap-x-5 items-center ">
        <div className=" w-24 h-24 rounded-full overflow-hidden border-l-2 border-t-2 border-r-2 border-b-2 border-orange-500   ">
          <div
            className={`w-8 h-8 rounded-full ml-5 mt-3 bg-mybg-linear ${pic ? "hidden" : ""} `}
          ></div>
          <div
            className={`w-24 h-24 rounded-full mt-2 ml-[-10px] bg-mybg-linear ${pic ? "hidden" : ""} `}
          ></div>
          {pic && (
            <Image
              className={` ${pic ? "" : "hidden"}`}
              src={pic.toString()}
              height={200}
              width={200}
              alt={pic?.toString() || ""}
            />
          )}
        </div>
        <div className=" flex gap-y-2 flex-col ip14:pl-0  ipse:pl-5 ">
          <h1 className="text-lg font-semibold">
            {username ? username : "No nickname"}
          </h1>
          <Link href={"/preview"}>
            <span className="text-primary">Preview</span>
          </Link>
        </div>
      </div>
      <div className=" container flex flex-col gap-2 ">
        <p className=" text-gray-400 ">Completed {rating} %</p>
        <div className=" w-full h-1 bg-gray-300 ">
          <div
            style={{ width: rating + "%" }}
            className={` transition-all duration-1000  h-1  bg-primary `}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileRating;
