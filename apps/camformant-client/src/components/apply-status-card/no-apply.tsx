import React from 'react'
import Pic from "../../../public/images/not-found.png";
import Image from "next/image";

const NoApply:React.FC = () => {
  return (
    <div className="flex h-full justify-center">
                <div className="flex flex-col justify-center items-center">
                    <Image src={Pic} alt={"error"} width={200} height={200} />
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-sm">{"Sorry, Your Don't Have A Data Yet."}</h1>
                        <p className="text-gray-400 text-xs ">
                            You will see your data when
                        </p>
                        <p className="text-gray-400 text-xs ">have applied your CV.</p>
                    </div>
                </div>
            </div>
  )
}

export default NoApply
