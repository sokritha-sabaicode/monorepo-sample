import React, { ReactNode } from "react";

interface BackgroundProps {
  children?: ReactNode;
  style?: string;
  bgColor?: string;
  bgImage?: string;
  childStyle?: string;
}
const Background: React.FC<BackgroundProps> = ({
  children,
  style,
  bgImage,
  childStyle
}) => {
  return (
    <div className={`h-full w-full flex flex-col justify-start items-center `}>
      <div
        className={`${bgImage} ${style ? style : " bg-mybg-linear "} w-full h-[20%]  `}/>
      <div
        className={ ` ${childStyle ? childStyle : "bg-white"} flex w-full flex-col  mt-[-50px]
      rounded-3xl justify-center items-center ` }
      >
        {children}
      </div>
    </div>
  );
};

export default Background;
