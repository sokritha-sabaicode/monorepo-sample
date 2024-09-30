"use client";

import React, { useEffect, useState } from "react";
import ProfileRating from "./profile-rating";
// import { TypeProfile } from "../profile/typeProfile";
import axios from "axios";

interface ProfileRating {
  totalRating: number;
}
const PuzzleProfile: React.FC<ProfileRating> = ({ totalRating }) => {
  const [pic, setPic] = useState<File | string | null>("");
  const [User, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const ip = 'http://172.20.10.5:3030'
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Make sure cookies are handled properly
    };
    // const ip = "http://localhost:3040";
    async function GetUser() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/profile/`, config);
        if (res) {
          setUser(res.data.username);
          setPic(res.data.pf);
        }
      } catch (error) {
      } finally {
      }
    }
    GetUser();
  }, []);

  return (
    <div>
      <ProfileRating
        rating={totalRating}
        pic={pic?.toString()}
        username={User}
      />
    </div>
  );
};

export default PuzzleProfile;
