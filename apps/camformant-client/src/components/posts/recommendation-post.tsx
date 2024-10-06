"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Heading } from "@/components/heading/heading";
import { Button } from "@/components/button/button";
import { AiOutlineArrowRight } from "react-icons/ai";
import axios from "axios";
import Image from "next/image";
import axiosInstance from "@/utils/axios";
import { API_ENDPOINTS } from "@/utils/const/api-endpoints";
import { Card } from "@/components/card/card";

export const RecommendationPost: React.FC = () => {
  const [jobData, setJobData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [love, setLove] = useState<boolean>(true); // State for triggering re-fetch

  const toggleFavorite = (jobId: string) => {
    setJobData((prevData) =>
      prevData.map((job) =>
        job._id === jobId ? { ...job, favorite: !job.favorite } : job
      )
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobResponse = await axiosInstance.get(
          `${API_ENDPOINTS.JOBS}`,
          {
            params: {
              limit: 5,
              sort: JSON.stringify({ createdAt: "desc" }),
            },
          }
        );
        const jobs = jobResponse.data.data.jobs;

        setJobData(jobs);
        setLoading(false);
      } catch (jobError) {
        setError("Failed to fetch job data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="container mt-8">
        <div className="text-center mt-10">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-2">
      <div className="my-2 flex flex-row justify-between">
        <Heading title="Recommend Company" />
        <Image
          src={"/images/bloodbros-search.gif"}
          alt={"logo"}
          width={50} // Add some margin for spacing
          height={50}
        />
      </div>
      <Swiper
        loop
        slidesPerView={1}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
            <SwiperSlide key={index}>
              <div className="mb-5 p-1">
                <Card
                  isLoading={true}
                  heart={love}
                  setHeart={() => setLove((prev) => !prev)}
                />
              </div>
            </SwiperSlide>
          ))
          : jobData.map((job) => (
            <SwiperSlide key={job._id}>
              <div className="mb-5 p-1">
                <Card
                  _id={job._id}
                  title={job.title}
                  position={job.position}
                  profile={job.companyId?.profile}
                  min_salary={job.min_salary}
                  max_salary={job.max_salary}
                  job_opening={job.job_opening}
                  type={job.type}
                  schedule={job.schedule}
                  location={job.location}
                  deadline={new Date(job.deadline)}
                  isLoading={loading}
                  heart={job.favorite}
                  setHeart={() => toggleFavorite(job._id)}
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      <div className="mt-7 mb-10">
        <Button
          text="Find Your Matching"
          link="#"
          icon={<AiOutlineArrowRight />}
        />
      </div>
    </div>
  );
};
