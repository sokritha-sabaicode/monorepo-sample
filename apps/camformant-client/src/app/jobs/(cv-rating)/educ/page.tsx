'use client'
import Button from '@/components/cv-rating-card/router-page/basic/button-add'
import HeaderBasic from '@/components/cv-rating-card/router-page/basic/header-basic'
import SkeletonLoader from '@/components/cv-rating-card/router-page/basic/skeleton'
import InputComponent from '@/components/input-field/input-component'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [academic,setAcademic]=useState<string>('')
    const [school,setSchool]=useState<string>('')
    const [major,setMajor]=useState<string>('')
    const [degree,setDegree]=useState<string>('')
    const [begindate,setBegindate]=useState<string>('')
    const [enddate,setEnddate]=useState<string>('')
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
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/education/`,config);
          if(!response){
            return null
          }
          const data=response.data
          setAcademic(data.academic);
          setSchool(data.school);
          setMajor(data.major);
          setDegree(data.degree);
          setBegindate(data.start_date);
          setEnddate(data.end_date);
        } catch (error) {
          
        }finally{
          setNext(false);
        }
      }
      GetData()
    },[])
  
  
    async function PostData() {
      try {
          setNext(true); // Trigger loading
          const DataValue = {
              academic,
              school,
              major,
              degree,
              start_date: begindate,
              end_date: enddate,
          };
        
          const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/education/`, DataValue, config);
          return response;
      } catch (error) {
          console.error(error);
      } finally {
          setNext(false); // Stop loading
      }
  }

  return (
    <div>
        <HeaderBasic title='Education' next={PostData} />
          {next&& <SkeletonLoader  text="Loading ..." /> }
        <InputComponent values={academic} setFocused={setFocusedField} focused={focusedField} txt="Highest academic qualification" setValues={setAcademic} valuesFouce="Academic" />
        <InputComponent values={school} setFocused={setFocusedField} focused={focusedField} txt="School" setValues={setSchool} valuesFouce="School" />
        <InputComponent values={major} setFocused={setFocusedField} focused={focusedField} txt="Major" setValues={setMajor} valuesFouce="Major" />
        <InputComponent values={degree} setFocused={setFocusedField} focused={focusedField} txt="Degree" setValues={setDegree} valuesFouce="Degree" />
        <InputComponent typeofInput='date' values={begindate} setFocused={setFocusedField} focused={focusedField} txt="Begin date" setValues={setBegindate} valuesFouce="Begindate" />
        <InputComponent typeofInput='date' values={enddate} setFocused={setFocusedField} focused={focusedField} txt="End date" setValues={setEnddate} valuesFouce="Enddate" />
        <Button label={''} onClick={function (): void {
        throw new Error('Function not implemented.')
      } }/>
    </div>
  )
}

export default Page