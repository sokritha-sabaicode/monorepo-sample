import Link from "next/link";
import React, { ReactNode } from "react";

interface Props {
  text: string;
  link: string;
  icon?: ReactNode;
}

export const Button: React.FC<Props> = ({ link, text, icon }) => {
  return (
    <div className="flex space-x-4 items-center justify-center px-10 py-4 bg-primary text-white rounded-xl">
      <Link href={link} className="text-md">
        {text}
      </Link>
      <div>
        {icon}
      </div>
    </div>
  );
};
