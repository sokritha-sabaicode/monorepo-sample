"use client";

import { CardGeneral } from "@/components/card-notification/card-general";
import { CardTips } from "@/components/card-notification/card-tips";
import { CategoryPosition } from "@/components/category-position/category-position";
import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";

// Assuming CategoryPositionData is an array of categories
interface typeMee {
  id: number;
  text: string;
}
const CategoryPositionData: typeMee[] = [
  { id: 1, text: "General" },
  { id: 2, text: "Tips" },
];

const Page: React.FC = () => {
  const [contentId, setContentId] = useState(1);
  const [color, setColor] = useState(true);

  const Content1 = () => (
    <div>
      <CardGeneral />
    </div>
  );
  const Content2 = () => (
    <div>
      <CardTips />
    </div>
  );

  const handleClick = () => {
    setColor(false);
  };
  function handleClickId(id: number) {
    setContentId(id);
  }

  return (
    <div >
      <div className="bg-white ">
        <div className=" shadow-md w-ful pb-4 ">
          <div className="flex items-center gap-5 justify-start  mt-9 ml-5 mb-4 ">
            <button onClick={() => history.back()}>
              <span className="text-2xl">
                <IoArrowBack />
              </span>
            </button>
            <h1 className="text-xl font-medium pl-1">Notification</h1>
          </div>

          <div className="flex justify-start items-center gap-5 overflow-x-auto p-1  ml-5 mb-4 ">
            {CategoryPositionData.map((item) => (
              <CategoryPosition
                key={item.id}
                className={`cursor-pointer ${contentId !== item.id ? " " : " bg-orange-500 "}`}
                text={item.text}
                onClick={() => handleClickId(item.id)}
              ></CategoryPosition>
            ))}
          </div>
        </div>
        <div className="mt-4 p-4">
          {contentId === 1 && <Content1 />}
          {contentId === 2 && <Content2 />}
        </div>
      </div>
    </div>
  );
};

export default Page;
