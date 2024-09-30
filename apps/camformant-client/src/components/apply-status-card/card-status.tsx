"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card } from "../card/card";
import ProcessApply from "./process-apply";
import { BiSolidChat } from "react-icons/bi";
import { BsFileTextFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import { MdFactCheck } from "react-icons/md";
import { PiTextAlignLeftFill } from "react-icons/pi";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Process Template Mapping
const processTemplate: { [key: string]: { text: string; icon: JSX.Element } } = {
  "1": { text: "Application Submitted", icon: <BsFileTextFill /> },
  "2": { text: "Under Review", icon: <IoEyeSharp /> },
  "3": { text: "Shortlisted", icon: <PiTextAlignLeftFill /> },
  "4": { text: "Interview Scheduled", icon: <BiSolidChat /> },
  "5": { text: "Accepted", icon: <MdFactCheck /> },
};

interface ApplyTotal {
  total: number;
  setTotal: (value: number) => void;
}

const CardStatus: React.FC<ApplyTotal> = ({ total, setTotal }) => {
  const [status, setStatus] = useState<number | undefined | null>(0);
  const [jobData, setJobData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [love ,setLove]=useState<boolean>(false);
  
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Make sure cookies are handled properly
  };

  useEffect(() => {
    async function GetData() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/applied/`, config);
        const responseData = res.data;
  
        // Extract the data array from responseData
        const data = responseData.data;
  
        let favorites = [];
        const favoritesResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/favorites/`, config);
        favorites = favoritesResponse.data;
  
        // Check if extracted data is an array
        if (Array.isArray(data)) {
          const updatedJobs = data.map((item: any) => {
            const { job, company } = item;
            const fav = favorites.find((favor: any) => favor.jobId === job._id);
            return {
              ...item,
              favorite: fav ? fav.favorite : false,
            };
          });
  
          // Update jobData with the modified favorite status
          setJobData(updatedJobs);
          setTotal(updatedJobs.length); // Update total count
        } else {
          console.error("Expected data to be an array but received:", data);
        }
  
        setIsLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Stop loading even if there's an error
      }
    }
  
    GetData();
  }, []);


  const refToStart = useRef<(HTMLDivElement | null)[]>([]);

  const handleClick = async (id: number | undefined, index: number) => {
    if (status === 0) {
      setStatus(0);
      setTimeout(() => {
        setStatus(id);
        refToStart.current[index]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 500);
    } else if (status === id) {
      setStatus(0);
    } else {
      setStatus(0);
      setTimeout(() => {
        setStatus(id);
        refToStart.current[index]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 500);
    }
  };

  function handleClick_Heart(id:any){
    setJobData(jobData.map((item: any) => {
      const { job, company ,favorite} = item;
      if(job._id===id){
        return {
         ...item,
          favorite:!favorite,
        }
      }
      return item;
    }))
  }

  return (
    <div className="pb-20">
      {isLoading ? (
        Array(5).fill(0).map((_, index) => (
          <div key={index} className="mb-5 rounded-xl drop-shadow-md">
            <Card isLoading={true} setHeart={() => {}} heart={false} />
          </div>
        ))
      ) : (
        jobData?.map((item: any, index: any) => {
          const { job, company, favorite } = item;  // Include favorite status here
          return (
            <div
              ref={(el: any) => (refToStart.current[index] = el)}
              // onClick={() => handleClick(job._id, index)}
              className="container p-1 w-full"
              key={job._id}
            >
              <Card
                _id={job._id}
                title={job.title}
                position={job.position}
                profile={company?.profile}
                min_salary={job.min_salary}
                max_salary={job.max_salary}
                job_opening={job.job_opening}
                type={job.type}
                schedule={job.schedule}
                location={job.location}
                deadline={new Date(job.deadline)}
                setHeart={() =>handleClick_Heart(job._id)} // You can implement the favorite toggle logic here
                heart={favorite}     // Pass the favorite status to the Card component
              />
              <div className={`${status !== job._id ? "hidden" : "block"} h-full w-full pb-7`}>
                {job.process?.map((x: any, i: number) => (
                  <ProcessApply
                    key={i}
                    status={x.status}
                    date={x.date}
                    month={x.month}
                    text={x.text}
                    icon={x.icon}
                  />
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
  
};

export default CardStatus;
