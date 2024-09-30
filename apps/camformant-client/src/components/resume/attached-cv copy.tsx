"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import SkeletonLoader from "../cv-rating-card/router-page/basic/skeleton";

const AttachedCvs: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [next, setNext] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string | null>(null); // To store the converted image URL
  const UploadsRef = useRef<HTMLInputElement | null>(null);

  function handleUploads() {
    UploadsRef.current?.click();
  }

  const config = {
    headers: {
      "Content-Type": "multipart/form-data", // Ensure this is correct
    },
    withCredentials: true,
  };

  // useEffect(() => {
  //   async function PostCV() {
  //     if (!file) return;
  //     try {
  //       setNext(true);
  //       const formData = new FormData();
  //       formData.append("file_path", file);

  //       const res = await axios.put(
  //         "http://localhost:3040/v1/user/cv-to-image", // Update this to your endpoint for conversion
  //         formData,
  //         config
  //       );

  //       if (res.status === 200 && res.data.imageUrl) {
  //         // Assuming the backend returns the image URL
  //         setImageURL(res.data.imageUrl); // Set the image URL to display the converted image
  //       } else {
  //         console.log("Error uploading CV");
  //       }
  //     } catch (error) {
  //       console.error("Error during upload and conversion:", error);
  //     } finally {
  //       setNext(false);
  //     }
  //   }

  //   PostCV();
  // }, [file]);

  function handleSelectFile(event: React.ChangeEvent<HTMLInputElement>) {
    const cv = event.target.files?.[0];
    if (cv) {
      console.log(`Selected CV: ${cv.name}`);
      // setImageURL(cv)
    }
  }

  return (
    <div>
      {next && (
        <div className="absolute w-full h-screen">
          <SkeletonLoader />
        </div>
      )}

      {imageURL ? (
        // Show the converted image
        <div className="mt-4">
          <img
            src={imageURL}
            alt="Converted CV"
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      ) : (
        // Show the upload button if no image is available
        <button
          onClick={handleUploads}
          className="w-full p-10 shadow-xl rounded-3xl flex justify-start items-center bg-white"
        >
          Attach CV
        </button>
      )}

      <input
        onChange={handleSelectFile}
        ref={UploadsRef}
        className="hidden"
        type="file"
        accept="application/pdf" // Restrict to PDF files
      />
    </div>
  );
};

export default AttachedCvs;
