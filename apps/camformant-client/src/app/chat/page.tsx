"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Background from "@/components/background/background";
import SkeletonCard from "@/components/message/SkeletonCard"; // Import SkeletonCard
import axiosInstance from "@/utils/axios";
import { API_ENDPOINTS } from "@/utils/const/api-endpoints";

interface JobConversation {
  participants: string[];
  companyName: string;
  companyProfile: string;
}

const Chat = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState<JobConversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    try {
      setIsLoading(true);
      const conversations = await axiosInstance.get(API_ENDPOINTS.CONVERSATIONS);
      setJobs(conversations.data.data);
    } catch (error: any) {
      console.error("Error:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJobClick = (job: JobConversation) => {
    router.push(`jobs/${job.participants[1]}/message`);
  };

  return (
    <div className="relative h-screen">
      <Background>
        <div className="absolute inset-0 flex flex-col mt-28 bg-white rounded-3xl xl:mt-32">
          <div className="flex-1 overflow-auto p-4">
            <p className="absolute mt-[-80px] text-white font-mono text-3xl font-bold">
              Contact
            </p>

            {isLoading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : error ? (
              <p>Something went wrong! Please try again.</p>
            ) : jobs.length === 0 ? (
              <p>No users available.</p>
            ) : (
              jobs
                .map((job, idx) => (
                  <div
                    key={idx}
                    className="p-4 mb-4 cursor-pointer hover:bg-gray-200 flex items-center gap-8"
                    onClick={() => handleJobClick(job)}
                  >
                    {job.companyProfile && (
                      <div className="w-14 h-11 flex overflow-hidden rounded-full xl:w-20 xl:h-20 bg-gray-200">
                        <img
                          src={job.companyProfile}
                          alt={`${job.companyName} profile`}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    )}
                    <div className="flex w-full justify-between">
                      <p>{job.companyName}</p>

                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </Background>

    </div>
  );
};

export default Chat;









