"use client";

import { BackButton_md } from "@/components/back/BackButton";
import { Card } from "@/components/card/card";
import SkeletonCard from "@/components/skeleton/skeleton-card";
import axiosInstance from "@/utils/axios";
import { API_ENDPOINTS } from "@/utils/const/api-endpoints";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";

const Page: React.FC = () => {
  const { user } = useAuth();
  const [jobData, setJobData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const toggleFavorite = async (jobId: string) => {
    const jobIndex = jobData.findIndex((job) => job._id === jobId);
    if (jobIndex === -1) return;

    const currentFavoriteStatus = jobData[jobIndex].favorite;
    const newFavoriteStatus = !currentFavoriteStatus;

    const updatedJobs = [...jobData];
    updatedJobs[jobIndex].favorite = newFavoriteStatus;
    setJobData(updatedJobs);

    try {
      if (newFavoriteStatus) {
        await axiosInstance.post(`${API_ENDPOINTS.FAVORITE}`, { jobId });
      } else {
        await axiosInstance.delete(`${API_ENDPOINTS.FAVORITE}/${jobId}`);
        // Remove the job from the list if unfavorited
        setJobData((prevData) => prevData.filter((job) => job._id !== jobId));
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
      setError('Failed to update favorite status. Please try again later.');

      // Revert the UI change if the API call fails
      updatedJobs[jobIndex].favorite = currentFavoriteStatus;
      setJobData(updatedJobs);
    }
  };

  useEffect(() => {
    const fetchFavoriteJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get the user's favorite job IDs
        const favoriteJobIds = user?.favorites || [];

        if (favoriteJobIds.length === 0) {
          setJobData([]);
          setLoading(false);
          return;
        }

        const response = await axiosInstance.get(`${API_ENDPOINTS.JOBS}`);

        const jobs = response.data.data.jobs;

        // Set favorite status to true for these jobs
        const jobsWithFavoriteStatus = jobs.map((job: any) => ({
          ...job,
          favorite: true,
        }));

        setJobData(jobsWithFavoriteStatus);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching favorite jobs:', error);
        setError("Failed to fetch favorite jobs.");
        setLoading(false);
      }
    };

    fetchFavoriteJobs();
  }, [user]);

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
              <SkeletonCard />
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
          No favorite jobs available
        </p>
      )}
    </div>
  );
};

export default Page;
