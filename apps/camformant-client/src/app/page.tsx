import { Header } from "@/components/header/header";
import { HomeNewReleases } from "@/home/home-new-release";
import { HomePosition } from "@/home/home-position";

export default function Home() {
  return( 
  <>
      <Header />
      <HomeNewReleases />
      <HomePosition />
  </>
  
);
}
