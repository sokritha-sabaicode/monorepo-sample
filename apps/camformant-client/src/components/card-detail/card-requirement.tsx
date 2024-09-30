import React from "react";

interface CardReqProps {
  required_experience?: string[];
}

export const CardReq: React.FC<CardReqProps> = ({ required_experience }) => {
  return (
    <div className="flex flex-col justify-center p-3 bg-white rounded-3xl drop-shadow-md pb-5">
      <h2 className="text-sm font-semibold">Position Requirement</h2>
      <ul className="list-disc pl-6 pt-2">
        <div className="flex flex-col gap-1 text-xs">
          {required_experience &&
            required_experience.length > 0 &&
            required_experience.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
        </div>
      </ul>
    </div>
  );
};
