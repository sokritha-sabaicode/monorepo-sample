"use client";
import { MdCalendarToday } from "react-icons/md";
import { dateFormat } from "@/utils/date";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import "react-loading-skeleton/dist/skeleton.css";
import Heart from "./heart";
import { useRouter } from "next/navigation";

interface CardProps {
  userId?: string;
  _id?: string;
  deadline?: Date;
  title?: string;
  position?: string;
  profile?: string;
  min_salary?: number;
  max_salary?: number;
  job_opening?: string;
  type?: string[];
  schedule?: string[];
  location?: string;
  day?: number | string;
  isFavorite?: boolean;
  setHeart: () => void;
  heart: boolean;
}

export const Card: React.FC<CardProps> = (props) => {
  const {
    _id,
    title,
    position,
    schedule,
    job_opening,
    deadline,
    profile,
    min_salary,
    max_salary,
    location,
    type,
    heart,
    setHeart,
  } = props;
  const router = useRouter();

  return (
    <div className="shadow drop-shadow-md bg-white rounded-2xl p-5">
      <div className="flex justify-between">
        <section className="flex gap-x-5 items-center">
          <img
            src={profile}
            alt={title}
            className="w-12 h-12 rounded-full object-cover border"
          />
          <div>
            <h1 className="text-md font-semibold text-secondary">{title}</h1>
            <span className="text-sm text-secondary">{position}</span>
          </div>
        </section>

        <section>
          <Heart heart={heart} handleLove={setHeart} />
        </section>
      </div>
      <Link href={`/jobs/${_id}`}>
        <div>
          <div className="flex flex-wrap space-x-2 text-xs text-primary  ">
            {type &&
              type.length > 0 &&
              type.map((item, index) => (
                <span
                  key={index}
                  className="bg-orange-50 px-3 py-1.5 rounded-full mt-5 "
                >
                  {item}
                </span>
              ))}
          </div>
          <div className="flex flex-wrap space-x-2 text-xs text-primary mt-3 ">
            {schedule &&
              schedule.length > 0 &&
              schedule.map((item, index) => (
                <span
                  key={index}
                  className=" bg-orange-50 px-3 py-1.5 rounded-full"
                >
                  {item}
                </span>
              ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-400">
              {job_opening} Job Opening
            </div>
            <div className=" text-lg text-primary font-semibold">{`${min_salary}$-${max_salary}$`}</div>
          </div>

          {deadline && (
            <div className="flex justify-between mt-3">
              <div className="flex space-x-2 items-center text-secondary">
                <label className="text-sm ">
                  <MdCalendarToday />
                </label>
                <span className="text-xs">{dateFormat(deadline, "en-US")}</span>
              </div>
              <div className="flex space-x-2 text-secondary">
                <label className="text-sm">
                  <FaMapMarkerAlt />
                </label>
                <span className="text-xs">{location}</span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};
