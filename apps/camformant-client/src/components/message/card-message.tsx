
import React from 'react'
import Image from 'next/image'
import { BackButton_md } from '@/components/back/BackButton'
import Data2 from '@/components/type-data/TypeofData'
import logo1 from "@/../../public/images/logo.png"

const CardMessage: React.FC<Data2> = ({ logo, txt, location }) => {
    return (
        <div className='w-full pl-5 flex justify-start gap-5 h-32 bg-white drop-shadow-md items-center '>
            <button onClick={()=>history.back()}> <BackButton_md /></button>

            <div className=' w-[80px] h-[80px] flex justify-center items-center bg-white rounded-full drop-shadow-xl  '>
                <Image src={logo1 || ""} width={50} height={50} alt='logo' />
            </div>
            <div className='flex flex-col justify-center gap-3 h-full'>
                <h1>{txt}</h1>
                <p>{location}</p>
            </div>

        </div>
    )
}

export default CardMessage
