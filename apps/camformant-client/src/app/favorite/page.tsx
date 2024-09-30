"use client";

import { BackButton_md } from "@/components/back/BackButton";
import { Card } from "@/components/card/card";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [jobData, setJobData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [love, setLove] = useState<boolean>(true);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Make sure cookies are handled properly
  };
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
        const [jobResponse, favoritesResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs`, {}),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/favorites/`, config),
        ]);

        const jobs = jobResponse.data.data.jobs;
        const favorites = favoritesResponse.data;

        const updatedJobs = jobs.map((job: any) => {
          const favoriteJob = favorites.find(
            (fav: any) => fav.jobId === job._id
          );
          return {
            ...job,
            favorite: favoriteJob ? favoriteJob.favorite : false,
          };
        });

        setJobData(updatedJobs);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
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

  // Filter to show only favorite jobs (where favorite is true)
  const filteredJobs = jobData.filter((job) => job.favorite === true);

  return (
    <div className="container pt-2 mb-20">
      <div className="mb-8 mt-4 h-10 w-14">
        <Link href={"/profile"}>
          <BackButton_md styles=" bg-primary p-3 px-4 rounded-xl" />
        </Link>
      </div>
      {loading ? (
        Array(5)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="mb-4 rounded-xl drop-shadow-md">
              <Card isLoading={true} setHeart={setLove} heart={love} />
            </div>
          ))
      ) : filteredJobs.length > 0 ? (
        filteredJobs.map((job) => (
          <div key={job._id} className="mb-5">
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
              setHeart={() => toggleFavorite(job._id)}
              heart={job.favorite}
            />
          </div>
        ))
      ) : (
        <p className="mb-20 h-56 w-full flex justify-center items-center">
          No favorite jobs available
        </p>
      )}
    </div>
  );
};

export default Page;
