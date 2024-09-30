import React, { ReactNode, useState } from "react";
import axios from "axios";
import { FcFullTrash } from "react-icons/fc";
import { SwipeableHandlers, useSwipeable } from "react-swipeable";
import Skeleton from "react-loading-skeleton";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { BsPersonVcard } from "react-icons/bs";


interface typeMiniCard {
  name: string;
  index: number;
  next: boolean;
  setNext: (next: boolean) => void;
  ReactNode_Child?: ReactNode;
  handlePush?: React.MouseEventHandler<HTMLSpanElement>;
  style?: string;
  isLoading?: boolean;
}

const MiniCardResume: React.FC<typeMiniCard> = ({
  name = "#",
  index,
  next,
  setNext,
  ReactNode_Child,
  handlePush,
  isLoading = false,
  style = "translate-x-[-120px]",
}) => {
  const [isSwiped, setIsSwiped] = useState<boolean>(false);
  const handlers: SwipeableHandlers = useSwipeable({
    onSwipedLeft: () => setIsSwiped(true),
    onSwipedRight: () => setIsSwiped(false),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const handleDelete = async () => {
    try {
      setNext(true);
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/user/cv/?index=${index}`,
        config
      );
      if (res.status === 200) {
        console.log("CV deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting CV:", error);
      alert("Error deleting CV");
    } finally {
      setNext(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex w-full max-w-lg p-6 items-center rounded-lg shadow-md gap-4 bg-white border border-gray-200">
          <Skeleton height={40} width={40} className="rounded-lg" />
          <div className="flex-1">
            <Skeleton height={35} width="80%" className="mb-2" />
          </div>
        </div>
      ) : (
        <div className="flex h-full justify-center items-center">
          <div
            {...handlers}
            key={index}
            className={` z-10 duration-300 transition-all ${isSwiped ? style : "translate-x-0"} flex w-full max-w-lg p-6 items-center rounded-lg shadow-md gap-4 bg-white border border-gray-200 hover:shadow-lg transform hover:scale-105`}
          >
            <a
              href={name}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-full flex items-center gap-4"
            >
              <span aria-label="File icon" className="text-3xl p-1 text-primary  ">
              <BsPersonVcard />
              </span>
              <span className="text-lg font-semibold text-gray-800">
                CV / Resume {index + 1}
              </span>
              <span className="absolute text-primary text-2xl right-4 animate-back-and-forth">
                <MdOutlineKeyboardDoubleArrowLeft  className={`${isSwiped ? " rotate-180 ": ""}`} />
              </span>
            </a>
          </div>
          <div className="flex justify-between gap-5">
            <span
              onClick={handlePush}
              className={`text-2xl ${isSwiped ? " translate-x-[-70px] " : " hidden"}`}
            >
              {ReactNode_Child}
            </span>
            <span
              onClick={handleDelete}
              className={`text-3xl duration-500 transition-all absolute  ${isSwiped ? " right-5 z-20 top-6 " : " z-0 right-5 top-0 "}`}
            >
              <FcFullTrash />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniCardResume;
