import Chat from "@/components/chat-home/chat";
import { Header } from "@/components/header/header";
import { PositionPost } from "@/components/posts/position-post";
import { RecommendationPost } from "@/components/posts/recommendation-post";

export default function Home() {
  return (
    <>
      <Header />
      <RecommendationPost />
      <PositionPost />
      <Chat className="fixed bottom-20 right-0 p-4 bg-gradient-to-br from-orange-400 via-pink-300 to-yellow-300 shadow-2xl rounded-full text-white transform transition-transform hover:scale-105" />
    </>
  );
}
