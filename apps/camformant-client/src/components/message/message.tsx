
"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { IoMdSend } from "react-icons/io";
import Background from "../background/background";
import socket from "@/utils/socketClient"; // Import the socket instance
import BackButton from "@/components/back/BackButton";
import axiosInstance from "@/utils/axios";
import { API_ENDPOINTS } from "@/utils/const/api-endpoints";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/context/auth";
import React from "react";
import { Job } from "@/app/jobs/[id]/message/page";

interface Message {
  _id?: string;
  text: string;
  senderId: string;
  recipientId: string;
  conversationId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const SkeletonLoader = () => (
  <div className="p-4 w-full">
    {/* Message Skeleton */}
    <div className="space-y-2">
      <div className="h-12 bg-gray-300 rounded rounded-md animate-pulse"></div>
      <div className="h-12 bg-gray-300 rounded rounded-md animate-pulse"></div>
      <div className="h-12 bg-gray-300 rounded rounded-md animate-pulse"></div>
    </div>
  </div>
);

const Message = React.memo(({ conversationId, job }: { conversationId: string | null, job: Job }) => {
  const params = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  // Ref to track message container for scrolling
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // Play sound notification when a new message is received
  const playNotificationSound = useCallback(() => {
    if (typeof window !== "undefined") {
      const notificationTone = new Audio('/iphone-sms-tone-original-mp4-5732.mp3');
      notificationTone.play();
    }
  }, []);

  // Scroll to the bottom of the messages container
  const scrollToBottom = useCallback(() => {
    const container = messageContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, []);

  // Join the room of conversation
  useEffect(() => {
    if (!conversationId) return;

    socket.emit('joinRoom', { conversationId });

    const handleReceiveMessage = (message: Message) => {
      console.log('Received message:', message)
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom(); // Ensure the latest message is visible
      playNotificationSound();
    };

    socket.on('receiveMessage', handleReceiveMessage);

    // Clean up on unmount
    return () => {
      socket.emit('leaveRoom', { conversationId });
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, [conversationId]);

  // Check Online & Offline Users
  useEffect(() => {
    // Listen for userOnline and userOffline events
    socket.on('userOnline', (userId: string) => {
      setOnlineUsers((prevUsers) => [...prevUsers, userId]);
    });

    socket.on('userOffline', (userId: string) => {
      setOnlineUsers((prevUsers) => prevUsers.filter((id) => id !== userId));
    });

    // Clean up
    return () => {
      socket.off('userOnline');
      socket.off('userOffline');
    };
  }, []);

  // Fetch messages when roomId changes
  useEffect(() => {
    if (!conversationId) return;

    // Fetch messages from the backend
    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get(`${API_ENDPOINTS.CONVERSATIONS}/${conversationId}/messages`);
        setMessages(response.data.data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, [conversationId]);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;

    console.log('userId', user!._id)

    const newMessage: Message = {
      text: inputMessage,
      senderId: user!._id,
      recipientId: id!,
      conversationId: conversationId!,
    };

    // Emit the message to the server
    socket.emit("sendMessage", newMessage);

    // Play the sending sound & Clear the input
    playNotificationSound();
    setInputMessage("");
  };

  if (!conversationId) {
    return (
      <div className="h-screen w-full flex flex-col">
        <Background>
          <SkeletonLoader />
        </Background>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-screen w-screen">
      {/* Background component */}
      <Background>
        {/* Header section: company profile */}
        <div className="bg-white rounded-t-3xl w-full h-32 flex justify-between items-center">
          {
            job && <div key={job._id} className=" absolute mt-[-220px] ml-36 gap-8 flex items-center justify-center">
              {/* Back1 displayed in front */}
              <div className=" -ml-32 z-10">
                <button onClick={() => router.back()}>
                  <BackButton />
                </button>
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
          }
        </div>

        {/*body section: render message*/}
        <div className="-mt-28" >
          <div
            className="overflow-auto w-screen h-[70vh] p-4 rounded-md xl:h-[60vh]"
            ref={messageContainerRef} // Add ref here
          >
            {messages && messages.map((message, idx) => (
              <div
                key={message._id}
                className={`${messages.length - 1 === idx ? "mb-8" : "mb-2"} flex ${message.senderId === user?._id ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`p-3 rounded-lg max-w-xs break-words ${message.senderId === user?._id ? "bg-gray-200 text-gray-900" : "bg-blue-600 text-white"
                    }`}
                >
                  {message.text}
                  <div
                    className={`text-xs ${message.senderId === user?._id ? "text-left text-gray-400" : "text-right text-gray-300"
                      } mt-1`}
                  >
                    {formatDistanceToNow(new Date(message.createdAt!), { addSuffix: true })}
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
});

// Add displayName for the component
Message.displayName = "MessageComponent";

export default Message;
