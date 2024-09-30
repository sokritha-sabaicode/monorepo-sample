'use client'

import Button from '@/components/cv-rating-card/router-page/basic/button-add'
import HeaderBasic from '@/components/cv-rating-card/router-page/basic/header-basic'
import SkeletonLoader from '@/components/cv-rating-card/router-page/basic/skeleton'
import InputComponent from '@/components/input-field/input-component'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [position, setPosition] = useState<string>('')
  const [company,setCompany]=useState<string>('');
  const [next,setNext] = useState<boolean>(false);

  // const ip = 'http://localhost:3040' 
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Make sure cookies are handled properly
  };

  useEffect(()=>{
    async function GetData(){
      try {
        setNext(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/reference/`,config);
        const data=response.data
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone_number);
        setPosition(data.position);
        setCompany(data.company);
      } catch (error) {
        
      }finally{
        setNext(false);
      }
    }
    GetData()
  },[])


    async function PostData(){
      try {
        setNext(true)
        const DataValue= {
            name: name||"",
            email: email||"",
            phone_number: phone||"",
            company: company||"",
            position: position||"",
          
          }
        
        const respone=await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/reference/`,DataValue,config);
        return respone        
      } catch (error) {
        console.error(error)
      }
      finally{
        setNext(false);
      }
    }


  return (
    <div>
      <HeaderBasic title='Reference' next={PostData}  />
        {next && <SkeletonLoader  text="Loading ..." /> }
      <InputComponent values={name} setFocused={setFocusedField} focused={focusedField} txt="Name Of Reference" setValues={setName} valuesFouce="year of experience" />
      <InputComponent values={email} setFocused={setFocusedField} focused={focusedField} txt="Email Of Reference" setValues={setEmail} valuesFouce="email" />
      <InputComponent values={phone} setFocused={setFocusedField} focused={focusedField} txt="Phone Number " setValues={setPhone} valuesFouce="positon" />
      <InputComponent values={position} setFocused={setFocusedField} focused={focusedField} txt="His Job" setValues={setPosition} valuesFouce="begin date" />
      <InputComponent values={company} setFocused={setFocusedField} focused={focusedField} txt="Company Name" setValues={setCompany} valuesFouce="company name" />
      {/* <InputComponent values={} setValues={}  setFocused={} focused={} txt='' valuesFouce=''  /> */}
      <Button label='Add' onClick={()=>{}} />
    </div>
  )
}

export default Page
