import React from "react";
import Image from "next/image";

interface ChatProps {
  logo?: any;
  title: string;
  subtitle: string;
  status:boolean
}

const Chatbox: React.FC<ChatProps> = ({ logo, title, subtitle,status }) => {
  return (
    <div className="w-full h-full p-4 rounded-xl shadow-sm flex items-center">
      <div className="flex w-full justify-between items-center p-2 gap-5 ">
        <div className="flex gap-4 ">
          {logo && <Image src={logo} alt={"logo"} width={80} height={80} />}
          <div className="flex flex-col gap-3 ">
            <h1 className="text-lg font-bold">{title}</h1>
            <h2 className="text-sm text-gray-500">{subtitle}</h2>
          </div>
        </div>
        {status? <div className="w-2 h-2 rounded-full bg-green-400 "/>:""}

      </div>
    </div>
  );
};

export default Chatbox;
