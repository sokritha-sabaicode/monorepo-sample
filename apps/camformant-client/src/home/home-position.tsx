"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../components/card/card";
import { categoryPosition } from "@/data/data.json";
import { Heading } from "@/components/heading/heading";
import { CategoryPosition } from "@/components/category-position/category-position";

export const HomePosition: React.FC = () => {
  const [jobData, setJobData] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Position");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [love, setLove] = useState<boolean>(true);


  const toggleFavorite = (jobId: string) => {
    setJobData((prevData) =>
      prevData.map((job) =>
        job._id === jobId ? { ...job, favorite: !job.favorite } : job
      )
    );
  };

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Make sure cookies are handled properly
    };

    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const query =
          selectedCategory !== "All Position"
            ? `?category=${selectedCategory}`
            : "";
        const jobResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs${query}`
        );

        const jobs = jobResponse.data.data.jobs;
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
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to fetch jobs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [selectedCategory]); // Only re-fetch when selectedCategory changes

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mt-5 pb-14">
      <Heading title="Positions" subTitle="You can find more positions here" />

      <div className="mb-8 mt-4 flex justify-start items-center gap-5 overflow-x-auto p-1">
        {categoryPosition.map((x) => (
          <div key={x.text}>
            <CategoryPosition
              text={x.text}
              onClick={() => handleCategoryClick(x.text)}
              isSelected={selectedCategory === x.text}
            />
          </div>
        ))}
      </div>

      {isLoading ? (
        Array(5)
          .fill(0)
          .map((_, index) => (
            <div key={index} className=" mb-4 rounded-xl drop-shadow-md">
              <Card isLoading={true} setHeart={setLove} heart={love} />
            </div>
          ))
      ) : jobData.length > 0 ? (
        jobData.map((job) => (
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
          No jobs available
        </p>
      )}
    </div>
  );
};
