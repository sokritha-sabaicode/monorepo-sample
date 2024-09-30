'use client'
import { BackButton_md } from "@/components/back/BackButton";
import React from "react";

interface typeofHeader{
    next?:()=>void;
    title?:string;
    save?:string;
    cacel?:()=>void;
}
const HeaderBasic:React.FC<typeofHeader> = ({next,title,save,cacel}) => {

    return (
        <div className="flex p-3 pt-7 shadow-md w-full h-full justify-between ">
            <div className="flex container gap-5 ">
                <div onClick={cacel?cacel:()=>history.back()}>
                <BackButton_md />                    
                </div>

                <h1 className="text-xl ">{title}</h1>
            </div>
            <button onClick={next} className="text-orange-500 text-lg pr-3 ">{save? save:'Next'}</button>
        </div>
    );
};

export default HeaderBasic;
