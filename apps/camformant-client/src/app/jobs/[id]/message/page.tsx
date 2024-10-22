"use client";

import Background from "@/components/background/background";
import Message from "@/components/message/message";
import { useAuth } from "@/context/auth";
import axiosInstance from "@/utils/axios";
import { API_ENDPOINTS } from "@/utils/const/api-endpoints";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface Company {
  name: string;
  profile: string;
}

export interface Job {
  _id: string;
  companyId: Company;
}

const ChatPage = () => {
  const { user } = useAuth();
  const params = useParams();
  const companyId = params.id as string | undefined;

  const [job, setJob] = useState<Job>();
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);

  // Fetch job data
  const fetchJob = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`${API_ENDPOINTS.JOBS}/${companyId}`);

      if (response.status === 200 && response.data.data) {
        setJob(response.data.data);

        // Once job data is fetched, call getConversationId
        await getConversationId({
          companyName: response.data.data.companyId.name,
          companyProfile: response.data.data.companyId.profile,
        });
      } else {
        setError("Job not found");
      }
    } catch (error) {
      console.error('chat error: ', error)
      setError("Failed to fetch job data");
    }
  }, [companyId, user]);

  useEffect(() => {
    if (companyId) {
      console.log('fetch job')
      fetchJob();
    }
  }, [companyId, fetchJob]);

  // Function to get conversation ID
  const getConversationId = async ({
    companyName,
    companyProfile,
  }: {
    companyName: string;
    companyProfile: string;
  }) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.CONVERSATIONS, {
        companyId,
        companyName,
        companyProfile,
        username: user?.username,
        userProfile: user?.profile,
      });

      setConversationId(response.data.data._id);
    } catch (error) {
      console.error("ChatPage getConversationId() error::: ", error);
    }
  };

  if (error) {
    return (
      <div className="h-screen flex flex-col">
        <Background>
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-red-500 text-xl">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Retry
            </button>
          </div>
        </Background>
      </div>
    );
  }

  return <Message conversationId={conversationId} job={job!} />;
};

export default ChatPage;
