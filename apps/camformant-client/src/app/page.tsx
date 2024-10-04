import { Header } from "@/components/header/header";
import { PositionPost } from "@/components/posts/position-post";
import { RecommendationPost } from "@/components/posts/recommendation-post";

export default function Home() {
  return (
    <>
      <Header />
      <RecommendationPost/>
      <PositionPost/>
    </>
  );
}
