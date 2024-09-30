/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import HeaderBasic from '@/components/cv-rating-card/router-page/basic/header-basic'
import InputComponent from '@/components/input-field/input-component'
import Button from '@/components/cv-rating-card/router-page/basic/button-add'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SkeletonLoader from '@/components/cv-rating-card/router-page/basic/skeleton'

const Page : React.FC = () => {
  const [experience, setExperience] = useState<string>('');
  const [company,setCompany]=useState<string>('');
  const [position,setPosition]=useState<string>('');
  const [beginDate,setBeginDate]=useState<string>('');
  const [endDate,setEndDate]=useState<string>('');
  const [description,setDescription]=useState<string>('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [next,setNext] = useState<boolean>(false);

  // const ip = 'http://172.20.10.5:3030'
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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/experience/`,config);
        const data=response.data
        setExperience(data.years_of_experience);
        setCompany(data.company_Name);
        setPosition(data.position);
        setBeginDate(data.start_date);
        setEndDate(data.end_date);
        setDescription(data.job_description);
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
          years_of_experience: experience,
          company_Name: company,
          position: position,
          start_date: beginDate,
          end_date: endDate,
          job_description: description,
          }
        
        const respone=await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/experience/`,DataValue,config);
        return respone        
      } catch (error) {
        console.error(error)
      }
      finally{
        setNext(false);
      }
    }



  return (
    <React.Fragment>
      <HeaderBasic title='Experience' next={PostData}  />
        {next && <SkeletonLoader  text="Loading ..." /> }
      <InputComponent typeofInput='Number' values={experience} setFocused={setFocusedField} focused={focusedField} txt="Years of Experience" setValues={setExperience} valuesFouce="year of experience" />
      <InputComponent values={company} setFocused={setFocusedField} focused={focusedField} txt="Company Name" setValues={setCompany} valuesFouce="company name" />
      <InputComponent values={position} setFocused={setFocusedField} focused={focusedField} txt="Position" setValues={setPosition} valuesFouce="positon" />
      <InputComponent typeofInput='date' values={beginDate} setFocused={setFocusedField} focused={focusedField} txt="Begin Date" setValues={setBeginDate} valuesFouce="begin date" />
      <InputComponent typeofInput='date' values={endDate} setFocused={setFocusedField} focused={focusedField} txt="End Date" setValues={setEndDate} valuesFouce="end date" />
      <InputComponent  values={description} setFocused={setFocusedField} focused={focusedField} txt="Job Description" setValues={setDescription} valuesFouce="job desctiption" />
      <Button label=' Add' onClick={()=>alert("hello")} />
     </React.Fragment>
  )
}

export default Page