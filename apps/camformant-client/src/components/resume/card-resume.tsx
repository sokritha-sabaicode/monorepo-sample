"use client";

import React, { useEffect, useState } from "react";
import Mypic from "../../../public/images/Croods User Interface.png";
import AttachedCvs from "./attached-cv";
import Image from "next/image";
import axios from "axios";
import MiniCardResume from "./mini-card-resume";

interface CvData {
  cv: string[]; // Adjust based on your actual data structure
}

const CardResume: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [cvs, setCvs] = useState<CvData | null>(null);
  const [next, setNext] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  useEffect(() => {
    const getCv = async () => {
      try {
        setLoading(true);
        const check_cv = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/user/cv/`,
          config
        );

        if (check_cv.status === 200) {
          setCvs(check_cv.data); // Set the entire response data, which includes the 'cv' array
          setShow(check_cv.data.cv.length > 0); // Set show based on whether there are CVs
        } else {
          setShow(false);
        }
      } catch (error) {
        console.error("Error fetching CV data:", error);
        setShow(false);
      } finally {
        setLoading(false);
      }
    };
    getCv();
  }, [next]);

  return (
    <div className="h-[400px] ">
      <AttachedCvs next={next} setNext={setNext} />

      {!show && !loading && (
        <div className="flex flex-col justify-center pt-5 items-center">
          <h1 className="font-semibold w-full text-xl pb-5">My Resume</h1>
          <Image
            src={Mypic}
            alt="Default profile image"
            width={200}
            height={200}
          />
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-sm">Sorry, You Do not Have a Resume Yet.</h1>
            <p className="text-gray-400 text-xs">You will see your data when</p>
            <p className="text-gray-400 text-xs">you have uploaded your CV.</p>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex flex-col justify-center pt-5 items-center pb-20">
          <h1 className="font-semibold w-full text-xl pb-5">My Resume</h1>
          <div className="w-full flex flex-col gap-3">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="mb-5 rounded-xl drop-shadow-md">
                  <MiniCardResume
                    isLoading={true}
                    name={""}
                    index={index}
                    next={next}
                    setNext={setNext}
                  />
                </div>
              ))}
          </div>
        </div>
      )}

      {show && (
        <div className="flex flex-col justify-center pt-5 items-center pb-20">
          <h1 className="font-semibold w-full text-xl pb-5">My Resume</h1>
          <div className="w-full flex flex-col gap-3  ">
            {cvs?.cv?.map((item: string, index: number) => (
              <div key={index} className="w-full relative h-full">
                <MiniCardResume
                  name={item}
                  index={index}
                  next={next}
                  setNext={setNext}
                  style="translate-x-[-70px]"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardResume;
