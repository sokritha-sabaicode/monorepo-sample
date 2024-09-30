import React from 'react'
import pic from "@/../../public/images/coming soon.webp"
import Image from 'next/image'
const CommingSoon = () => {
  return (
    <div className='flex flex-col h-screen w-full justify-center items-center'>
        <h1>Soory, the page on develop ...</h1>
      <Image src={pic} alt={''} width={400} height={400} />
    </div>
  )
}

export default CommingSoon
