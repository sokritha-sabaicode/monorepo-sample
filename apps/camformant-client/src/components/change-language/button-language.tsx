'use client'
import React, { useState } from 'react'
import kh from "@/../../public/icon-social/language_/cambodia.png"
import eng from "@/../../public/icon-social/language_/english.png"
import Image from 'next/image'

const ButtonLanguage:React.FC = () => {
    const [swich,setSwich]=useState<boolean>(false)

  return (
    <div onClick={()=>setSwich(!swich)} className={`flex w-10 h-5 rounded-2xl bg-white relative `}>

        <span className={` absolute ${swich? 'left-0' : ' right-0' } `} > <Image src={swich? kh:eng} alt={""} width={20}  /> </span>

    </div>
  )
}

export default ButtonLanguage
