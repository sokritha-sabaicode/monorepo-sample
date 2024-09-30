'use client'
import Link from "next/link";
import React, { useState } from "react";
import { BackButton_md } from "../back/BackButton";
import PuzzleProfile from "./puzzle-profile";
import PuzzleCard from "./puzzle-card";

const AllPuzzle = () => {
    const [total,setTotal]=useState<number>(0)
    
  return (
    <div >
      <Link href={"/profile"}>
        <BackButton_md styles="absolute bg-white p-3 px-4 rounded-xl top-5  left-3  " />
      </Link>
      <div className=" container ">
        <PuzzleProfile totalRating={total} />
      </div>
      <div>
        <PuzzleCard propTotal={setTotal} />
      </div>
    </div>
  );
};

export default AllPuzzle;
