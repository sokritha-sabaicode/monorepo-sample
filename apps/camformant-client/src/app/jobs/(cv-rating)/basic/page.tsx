'use client'
import HeaderBasic from '@/components/cv-rating-card/router-page/basic/header-basic'
import InputField from '@/components/cv-rating-card/router-page/basic/input-field'
import React, { useState } from 'react'

const Page = () => {
  const [post,setPost]=useState<boolean>(false)
  function HandleSubmit(){
    setPost(!post)
  }
  return (
    <div>
      <HeaderBasic title='Basic Information' next={HandleSubmit} />
      <InputField post={post}/>
      
    </div>
  )
}

export default Page
