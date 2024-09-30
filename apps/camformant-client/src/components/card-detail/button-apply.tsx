
import Data2 from '@/components/type-data/TypeofData';
import Link from 'next/link';
import React from 'react'
import { MdMessage } from "react-icons/md";

interface TypeApply{
  id?: string|string[];
  handleClick?: () => void;
  next?: boolean;
  setNext?: (next:boolean) => void;
}

const ButtonApply:React.FC<TypeApply> = ({id,handleClick,next,setNext}) => {


  return (
    <div className=' fixed pl-5 pr-5 w-full h-20 flex justify-center gap-3 items-center bottom-0 z-30 bg-white '>
      <button onClick={handleClick}  className={ ` ${next ? 'bg-gray-400 pointer-events-none ':'bg-primary'} p-3 w-full rounded-3xl text-white` }>Apply Now</button>
      <span className=' p-3  text-primary text-xl bg-white drop-shadow-2xl rounded-2xl '>
        <Link href={`${id}/message`}> <MdMessage /></Link> </span>
    </div>  
  )
}

export default ButtonApply

