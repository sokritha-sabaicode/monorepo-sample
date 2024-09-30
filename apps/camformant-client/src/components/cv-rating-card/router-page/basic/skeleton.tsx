import React from 'react';

interface typeLoading{
  text?:string;
}
const SkeletonLoader: React.FC<typeLoading> = ({text}) => {
  return (
    <div className="w-full top-0 left-0 h-screen z-20 fixed bg-slate-300/50 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        {/* Spinning circle loader */}
        <div className="loader rounded-full border-t-4 border-black border-solid w-16 h-16 mb-4 animate-spin "></div>
        <h1 className="text-black text-xl">{text? text :'Updating...'}</h1>
      </div>
    </div>
  );
};

export default SkeletonLoader;
