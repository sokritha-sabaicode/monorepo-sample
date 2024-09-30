import React, { ReactNode, isValidElement } from "react";
import { MdFactCheck } from "react-icons/md";

interface ProcessApply {
  date?: string;
  month?: string;
  status?: boolean;
  text?:string;
  icon?: ReactNode;
}


const ProcessApply: React.FC<ProcessApply> = ({ date, status, month, icon,text }) => {
  return (
    <div className=" w-full flex flex-col justify-center pt-2 ">
      <div className="  container w-full  ">
        <div className="flex items-center gap-10">
          <label className={`${status ? 'block' : ' opacity-0 '} flex flex-col`}>
            {month} <span>{date}</span>
          </label>
          <span className={` ${status? 'text-orange-500':'text-gray-400'} p-5 flex justify-center rounded-full items-center text-xl bg-white shadow-md `}>
            {icon}
          </span>
          <label className=" w-full text-sm ">{text}</label>
        </div>
        <div className="flex w-full gap-10 items-center relative  ">
          <span className="flex w-2 h-4 items-center" />
          <span className="flex w-2 h-4 items-center" />
          <div className="flex w-2 items-center flex-col gap-2">
            <span
              className={` ${status ? "block bg-primary " : " hidden"} h-3 w-3  rounded-full mt-[-6px] `}
            />
            {isValidElement(icon) && icon.type !== MdFactCheck && (
              <>
                <span
                  className={` ${status ? "bg-orange-400" : "bg-gray-400"} flex w-[2px] h-5 items-center gap-10 `}
                />
                <span
                  className={` ${status ? "bg-orange-400" : "bg-gray-400"} flex w-[2px] h-2 items-center gap-10 `}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessApply;
