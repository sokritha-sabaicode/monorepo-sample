
"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { IoMdSend } from "react-icons/io";
import Background from "../background/background";
import { formatDistanceToNow } from "date-fns";
import socket from "@/utils/socketClient"; // Import the socket instance
import BackButton from "@/components/back/BackButton";

interface Company {
  name: string;
  profile: string;
}

interface Job {
  _id: string;
  companyId: Company;
}

interface Message {
  text: string;
  sender: "user" | "company";
  timestamp: Date;
  companyId: string;
  companyName: string;
}

const Message = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [jobData, setJobData] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const username = "user";

  // Ref to track message container for scrolling
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // Play sound notification when a new message is received
  const playNotificationSound = () => {
    if (typeof window !== "undefined") {
      const notificationTone = new Audio('/iphone-sms-tone-original-mp4-5732.mp3');
      notificationTone.play();
    }
  };

  // Fetch job data
  const fetchJob = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs/${id}`);
      if (response.status === 200 && response.data.data) {
        setJobData([response.data.data]);
      } else {
        setError("Job not found");
      }
    } catch (error) {
      setError("Failed to fetch job data");
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Fetch messages
  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3002/messages/${id}`);
      if (response.status === 200) {
        const updatedMessages = response.data.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(updatedMessages);
      } else {
        console.error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to fetch messages", error);
    }
  }, [id]);

  useEffect(() => {
    fetchJob();
    fetchMessages();

    const handleUserOnlineStatus = (users: string[]) => {
      setOnlineUsers(users);
    };

    socket.on("userOnlineStatus", handleUserOnlineStatus);

    return () => {
      socket.off("userOnlineStatus", handleUserOnlineStatus);
    };
  }, [fetchJob, fetchMessages]);

  // Scroll to the bottom of the messages container
  const scrollToBottom = useCallback(() => {
    const container = messageContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, []);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const newMessage: Message = {
      text: inputMessage,
      sender: username,
      timestamp: new Date(),
      companyId: id || "",
      companyName: jobData[0]?.companyId.name || "",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    playNotificationSound();
    setInputMessage("");
    // Emit the message to the server
    socket.emit("message", newMessage);
  };

  return (
    <div className="relative flex flex-col h-screen w-screen">
      {/* Background component */}
      <Background>
        {/* Header section: company profile */}
        <div className="bg-white rounded-t-3xl w-full h-32 flex justify-between items-center">
          {jobData.map((job) => (
            <div key={job._id} className=" absolute mt-[-220px] ml-36 gap-8 flex items-center justify-center">
              {/* Back1 displayed in front */}
              <div className=" -ml-32 z-10">
                <BackButton />
              </div>

              {/* Company profile image */}
              {job.companyId.profile && (
                <div className="relative w-20 h-20 overflow-hidden rounded-full -ml-5">
                  <img
                    src={job.companyId.profile}
                    alt={`${job.companyId.name} profile`}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              )}


              {/* Company name and online status */}
              <div className="-ml-5 text-center flex flex-col">
                <p className="font-mono font-bold text-xl xl:text-3xl text-white">
                  {job.companyId.name}
                </p>
                <p className="text-gray-700 mt-2  text-sm ">
                  {onlineUsers.includes(job._id) ? "online 🟢" : "offline"}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/*body section: render message*/}
        <div className="-mt-28" >
          <div
            className="overflow-auto w-screen h-[70vh] p-4 rounded-md xl:h-[60vh]"
            ref={messageContainerRef} // Add ref here
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 flex ${message.sender === username ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-3 rounded-lg max-w-xs break-words ${message.sender === username ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"}`}
                >
                  {message.text}
                  <div className={`text-xs ${message.sender === username ? "text-right" : "text-left"} ${message.sender === username ? "text-gray-300" : "text-gray-400"} mt-1`}>
                    {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Footer section: message input */}
        <div className="absolute bottom-9 left-0 w-full bg-white py-4 flex justify-center items-center xl:w-full">
          <div className="p-5 w-full  flex justify-center items-center relative">
            <input
              className="p-4 border border-gray-200 rounded-3xl shadow-sm w-full"
              type="text"
              placeholder="Text Message"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <span
              className="text-2xl absolute right-7 cursor-pointer"
              onClick={sendMessage}
            >
              <IoMdSend />
            </span>
          </div>
        </div>
      </Background>
    </div>

  );
};

export default Message;
