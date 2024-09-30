import React from "react";
import Background from "../background/background";
import { FaUpload } from "react-icons/fa";
import CardResume from "./card-resume";

const PuzzleResume = () => {
  return (
    <Background style="rounded-3xl bg-mybg-linear ">
      <div className="w-full h-full flex gap-4 flex-col  ">
        <button className=" mt-[-10%] w-full shadow-xl rounded-3xl flex justify-start p-10 items-center bg-white ">
          <span className=" pr-4 text-red-500">
          <FaUpload />
          </span>
          Create & Generate CV Online
        </button>

        <CardResume />
      </div>
    </Background>
  );
};

export default PuzzleResume;
