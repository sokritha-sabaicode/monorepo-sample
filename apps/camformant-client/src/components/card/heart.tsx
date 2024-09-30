'use client'
import React from "react";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import { IoFastFood } from "react-icons/io5";

interface typHeart{
  heart:boolean
  handleLove:React.MouseEventHandler<HTMLDivElement>
}
const Heart:React.FC<typHeart> = ({heart,handleLove}) => {
  return (
    <div onClick={handleLove}>
      {heart ? (
        <div className="text-xl text-red-500">
          <BiSolidHeart />
        </div>
      ) : (
        <div className="text-xl">
          <BiHeart />
        </div>
      )}
    </div>
  );
};

export default Heart;
