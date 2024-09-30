"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
import Background from "@/components/background/background";
import Back1 from "@/components/back1/back1";
import SkeletonCard from "@/components/message/SkeletonCard"; // Import SkeletonCard

interface Company {
  _id: string;
  name: string;
  profile: string;
}

interface Job {
  _id: string;
  companyId: Company;
  online: boolean; // New field for online status
  messageCount: number; // New field for message count
}

const Chat = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [socket, setSocket] = useState<any>(null);

  // Initialize Socket.IO connection
  useEffect(() => {
    const socketClient = io("http://localhost:3002"); // Replace with your backend URL
    setSocket(socketClient);
    return () => {
      socketClient.disconnect();
    };
  }, []);

  const getJobs = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<{ data: { jobs: Job[] } }>("http://localhost:3001/api/v1/jobs");
      const jobsWithMessages = await Promise.all(response.data.data.jobs.map(async (job) => {
        const messageResponse = await axios.get(`http://localhost:3002/messages/${job._id}`); // Adjust the endpoint
        return {
          ...job,
          messageCount: messageResponse.data.length, // Set the message count
        };
      }));
      setJobs(jobsWithMessages);
    } catch (error: any) {
      console.error("Error:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update online status using Socket.IO
  useEffect(() => {
    if (socket) {
      socket.on("userOnlineStatus", (onlineUsers: string[]) => {
        const updatedJobs = jobs.map((job) => ({
          ...job,
          online: onlineUsers.includes(job.companyId._id),
        }));
        setJobs(updatedJobs);
      });
    }
  }, [socket, jobs]);

  useEffect(() => {
    getJobs();
  }, []);

  const handleJobClick = (job: Job) => {
    if (job.companyId.name && job._id) {
      router.push(`${job.companyId.name}/${job._id}/message?&jobId=${job._id}`);
    }
  };

  return (
    <div className="relative h-screen">
      <Background>
        <div className="absolute inset-0 flex flex-col mt-28 bg-white rounded-3xl xl:mt-32">
          <div className="flex-1 overflow-auto p-4">
            <p className="absolute mt-[-80px] text-white font-mono text-3xl font-bold">
              <Back1 /> Contact
            </p>
            {isLoading ? (
              // Render 5 skeleton cards while loading
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
                .filter((job) => job.messageCount > 0) // Only show jobs with messages
                .map((job) => (
                  <div
                    key={job._id}
                    className="p-4 mb-4 cursor-pointer hover:bg-gray-200 flex items-center gap-8"
                    onClick={() => handleJobClick(job)}
                  >
                    {job.companyId.profile && (
                      <div className="w-14 h-11 flex overflow-hidden rounded-full xl:w-20 xl:h-20 bg-gray-200">
                        <img
                          src={job.companyId.profile}
                          alt={`${job.companyId.name} profile`}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    )}
                    <div className="flex w-full justify-between">
                      <p>{job.companyId.name}</p>
                      <p className={`text-sm ${job.online ? "text-green-500" : "text-red-500"}`}>
                        {job.online ? "🟢" : ""}
                      </p>
                      {/* <p className="text-sm text-gray-600">{job.messageCount} messages</p> */}
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
