"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Card } from "../card/card";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const SearchCard: React.FC = () => {
  const [jobData, setJobData] = useState<any[]>([]);
  const [getValue, setGetValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [love, setLove] = useState<boolean>(true);

  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };

  const toggleFavorite = (jobId: string) => {
    setJobData((prevData: any) =>
      prevData.map((job: any) =>
        job._id === jobId ? { ...job, favorite: !job.favorite } : job
      )
    );
  };

  const searchParams = useSearchParams();
  const values = searchParams.get("values");

  useEffect(() => {
    setGetValue(values || "");
  }, [values]);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setLoading(true);
        const jobResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs`,
          {
            params: {
              limit: 5,
              sort: JSON.stringify({ createdAt: "desc" }),
            },
          }
        );

        // const [jobResponse, favoritesResponse] = await Promise.all([
        //   axios.get("http://localhost:3001/api/v1/jobs", {
        //     params: { search: getValue, page: 1, limit: 5 },
        //   }),
        //   axios.get("http://localhost:3040/v1/user/favorites/", config),
        // ]);

        const jobs = jobResponse?.data?.data?.jobs || [];
        let favorites = [];
        try {
          const favoritesResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/user/favorites/`,
            config
          );
          favorites = favoritesResponse.data;
        } catch (favError) {
          console.error("Failed to fetch favorites data:", favError);
          // Proceed without favorites
        }
        const updatedJobs = jobs?.map((job: any) => {
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
        console.error("Error fetching data:", error);
        setError("Failed to fetch job data");
        setLoading(false);
      }
    };

    fetchJobData();
  }, [getValue]);

  return (
    <Suspense>
      <div className="flex flex-col pt-6 pb-20 gap-4 w-full h-full">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div className="mb-2 p-1" key={index}>
                <Card
                  isLoading={true}
                  heart={love}
                  setHeart={() => setLove((prev) => !prev)}
                />
              </div>
            ))
          : jobData?.map((job: any, index: any) => {
              return (
                <div key={index} className="container">
                  <Card
                    _id={job._id}
                    title={job.title}
                    position={job.position}
                    profile={job?.companyId?.profile || "defaultProfileUrl"}
                    min_salary={job.min_salary}
                    max_salary={job.max_salary}
                    job_opening={job.job_opening}
                    type={job.type}
                    schedule={job.schedule}
                    location={job.location}
                    deadline={new Date(job.deadline)}
                    heart={job.favorite}
                    setHeart={() => toggleFavorite(job._id)}
                  />
                </div>
              );
            })}
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </Suspense>
  );
};

export default SearchCard;
