"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { MdCircleNotifications } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { IoCameraSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Background from "@/components/background/background";
import ButtonSigOut from "@/components/login-logout/sign-out";
import Link from "next/link";
import Cropper, { Area } from "react-easy-crop";
import getCroppedImg from "@/components/profile/crop";
import HeaderBasic from "@/components/cv-rating-card/router-page/basic/header-basic";
import axios from "axios";
import { TypeProfile } from "@/components/profile/typeProfile";
import { API_ENDPOINTS } from "@/utils/const/api-endpoints";
import axiosInstance from "@/utils/axios";

const SkeletonLoader = ({
  width = "w-32",
  height = "h-32",
  rounded = "rounded-full",
}) => (
  <section className="container flex flex-col items-center gap-y-10 p-4">
    <div className="flex flex-col items-center gap-4">
      <div className={`${width} ${height} ${rounded} bg-gray-200`} />
      <div className="w-20 h-5 bg-gray-200 rounded-md" />
    </div>
    <div className="flex flex-col items-start gap-4 w-full">
      <div className="flex justify-between gap-4">
        <div className="w-5 h-5 bg-gray-200 rounded-3xl" />
        <div className="w-40 h-5 bg-gray-200 rounded-md" />
      </div>
      <div className="flex justify-between gap-4">
        <div className="w-5 h-5 bg-gray-200 rounded-3xl" />
        <div className="w-40 h-5 bg-gray-200 rounded-md" />
      </div>
      <div className="flex justify-between gap-4">
        <div className="w-5 h-5 bg-gray-200 rounded-3xl" />
        <div className="w-40 h-5 bg-gray-200 rounded-md" />
      </div>
    </div>
  </section>
);

const Page: React.FC = () => {
  const RefFile = useRef<HTMLInputElement | null>(null);
  const [pic, setPic] = useState<File | string | null>(null);
  const [Upload, setUpload] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [User, setUser] = useState<TypeProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const postData = async () => {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure this is correct
        },
        withCredentials: true,
      };
      try {
        const formData = new FormData();
        if (Upload) {
          formData.append("photo", Upload);
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/user/photo/`,
            formData,
            config
          );
        }

        // Fetch user data after uploading the photo
        const res = await axiosInstance.get(API_ENDPOINTS.PROFILE);
        if (res.status == 200) {
          setUser(res.data);
          setPic(res.data.pf);
        } else if (res.status == 401) {
          console.log("Not Get data");
        }
      } catch (error) {
        console.log("Error:");
      } finally {
        setLoading(false);
      }
    };

    postData();
  }, [Upload]);

  function handleImage() {
    if (User?.username) {
      RefFile.current?.click();
    } else {
      alert("Please login to view and update your profile picture");
    }
  }

  function handleSelectImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setIsCropping(true);
      };
    }
  }

  const handleCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      const response = await fetch(croppedImage);
      const blob = await response.blob();
      const file = new File([blob], "cropped-image.png", { type: "image/png" });
      setUpload(file);
      setIsCropping(false);
    } catch (error) {
      console.error("Failed to crop image", error);
    }
  };

  function handleCropCancel() {
    setIsCropping(false);
  }

  function handleLogout() {
    setUser(null);
    setPic("");
    if (!User?.username) {
      router.push("/register");
    }
  }

  return (
    <div className="w-full h-screen ipse:h-[130vh] ipx:h-screen">
      <Background style="bg-mybg-linear ipx:h-[20%] ipse:h-[22%]">
        <div className="container mt-[-70px] flex flex-col items-center justify-center gap-5">
          <div className={` relative ${loading ? "hidden" : ""} `}>
            <div className={` w-32 h-32 rounded-full overflow-hidden bg-white`}>
              <div
                className={`w-10 h-10 rounded-full ml-9 mt-4 bg-mybg-linear ${pic ? "hidden" : ""} `}
              ></div>
              <div
                className={`w-28 h-28 rounded-full mt-2 ml-[-15px] bg-mybg-linear ${pic ? "hidden" : ""} `}
              ></div>
              {!pic && <SkeletonLoader />}
              {pic && (
                <div className={` `}>
                  <Image
                    className="object-cover"
                    src={pic.toString()}
                    height={200}
                    width={200}
                    alt="Profile Picture"
                  />
                </div>
              )}
            </div>
            <input
              onChange={handleSelectImage}
              ref={RefFile}
              className="hidden"
              type="file"
              name="myImage"
              accept="image/*"
            />
            <span
              onClick={handleImage}
              className="text-gray-400 shadow-xl right-0 bottom-0 absolute p-3 flex items-center rounded-full bg-white text-2xl"
            >
              <IoCameraSharp />
            </span>
          </div>

          {isCropping && (
            <div className="fixed w-full inset-0 z-40 flex items-center justify-center bg-black bg-opacity-60 ">
              <div className="relative w-96 h-screen p-4 rounded">
                <Cropper
                  image={imageSrc || ""}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={handleCropComplete}
                />
              </div>
              <div className="z-50 top-0 w-full absolute bg-white ">
                <HeaderBasic
                  title="Profile Picture"
                  save="Save"
                  next={handleCropSave}
                  cacel={handleCropCancel}
                />
              </div>
            </div>
          )}

          <h1 className={` relative ${loading ? "hidden" : ""} text-xl `}>
            {User ? User.username : "no nickname"}
          </h1>

          {loading ? (
            <SkeletonLoader />
          ) : (
            <div className="p-5 w-full flex flex-col gap-5 justify-center items-center bg-white shadow-[0_35px_224px_15px_rgba(0,0,0,0.2)] rounded-3xl">
              <Link
                className={`w-full ${User?.username ? "" : "hidden"}`}
                href={"/cv-rating"}
              >
                <span className="flex w-full text-lg gap-5 items-center">
                  <FaCircleUser />
                  <div>Personal Profile</div>
                </span>
              </Link>
              <Link className="w-full" href={"/favorite"}>
                <span className="flex w-full text-lg gap-5 items-center">
                  <FaRegHeart size={18} />
                  <div className="pl-1">favorite</div>
                </span>
              </Link>
              <Link className="w-full" href={"/notification"}>
                <span className="flex w-full text-lg gap-5 items-center">
                  <MdCircleNotifications size={22} />
                  <div>Notification</div>
                </span>
              </Link>
            </div>
          )}
          <ButtonSigOut
            Logout={handleLogout}
            logout={User?.username?.toString() || null}
          />
        </div>
      </Background>
    </div>
  );
};

export default Page;