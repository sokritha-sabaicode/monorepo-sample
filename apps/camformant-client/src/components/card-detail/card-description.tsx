import Data2 from "@/components/type-data/TypeofData";
import React from "react";

interface CardApplyProps {
  title?: string;
  min_salary?: string;
  max_salary?: string;
  schedule?: string[];
  description?: string;
  benefit?: string[];
}

export const CardDescription: React.FC<CardApplyProps> = ({
  title,
  min_salary,
  max_salary,
  schedule,
  description,
  benefit,
}) => {
  return (
    <div className="w-full flex flex-col justify-center p-3 bg-white rounded-3xl shadow-md pb-6">
      <div className="flex w-full justify-between ">
        <h2 className="text-sm font-semibold ">{title}</h2>
        {/* <p className="text-gray-400 text-sm ">5 Application</p>s */}
      </div>
      <div className="text-xs">
        <div className="text-primary text-base pt-3 font-semibold">
          {min_salary}$-{max_salary}$
        </div>
        <div className="flex flex-wrap space-x-3 text-sm font-semibold text-primary pt-3">
          {schedule &&
            schedule.length > 0 &&
            schedule.map((item, index) => <span key={index}>{item}</span>)}
        </div>
        <div className="flex flex-wrap space-x-3 text-sm font-semibold text-primary pt-1">
          {benefit &&
            benefit.length > 0 &&
            benefit.map((item, index) => <span key={index}>{item}</span>)}
        </div>

        <h2 className="text-base font-semibold pt-3">Job Description </h2>
        <p className=" text-xs pt-2">{description}</p>
      </div>
    </div>
  );
};
