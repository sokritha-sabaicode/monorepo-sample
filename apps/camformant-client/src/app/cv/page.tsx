import SelectCV from "@/components/page-apply-cv/select-cv";
import React from "react";

const Page = () => {
  return (
    <div className="h-screen bg-orange-400 flex flex-col justify-between items-center">
      {/* Header Section */}
      <div className="text-center pt-24">
        <h1 className="text-3xl font-bold text-white mb-5">Choose Your CV📋</h1>
        <p className="text-white text-lg font-serif">Please upload your CV below:</p>
      </div>

      {/* SelectCV Section */}
      <div className=" bg-orange-200 w-full max-w-lg p-6 rounded-t-3xl  flex-grow mt-5">
      <div className="overflow-auto  max-h-[75vh] h-screen">
        <SelectCV />
      </div>
      </div>
    </div>
  );
};

export default Page;