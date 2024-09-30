import Background from "@/components/background/background";
import AllPuzzle from "@/components/cv-rating-card/all-puzzle";
import React from "react";

const Page: React.FC = () => {
  return (
    <div className="h-screen w-full ipse:h-[130vh] ipx:h-screen ">
      <Background
        style="bg-mybg-linear rounded-ee-2xl rounded-es-2xl"
        childStyle="bg-none"
      >
        <AllPuzzle />
      </Background>
    </div>
  );
};

export default Page;
