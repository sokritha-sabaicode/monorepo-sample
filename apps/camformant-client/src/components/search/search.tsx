"use client";

import { Sheet } from "react-modal-sheet";
import { Filter } from "./filter";
import Link from "next/link";
import { RefObject, useEffect, useState } from "react";
import { IoMdFunnel } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { BackButton_md } from "../back/BackButton";

interface autoFocusd {
  focus?: RefObject<HTMLInputElement>;
  buttonBack?: boolean;
}
export const Search: React.FC<autoFocusd> = ({ focus, buttonBack }) => {
  const [values, setValues] = useState<string>("no");
  const [reset, setReset] = useState<number>(0);
  const [isOpen, setOpen] = useState(false);

  const defaultPerson = { id: 0, name: "default" };

  const [selectedWorkSchedule, setSelectedWorkSchedule] =
    useState(defaultPerson);
  const [selectedEmploymentType, setSelectedEmploymentType] =
    useState(defaultPerson);
  const [selectedWorkLocation, setSelectedWorkLocation] =
    useState(defaultPerson);

  function handleReset() {
    setReset(0);
    setSelectedWorkSchedule(defaultPerson);
    setSelectedEmploymentType(defaultPerson);
    setSelectedWorkLocation(defaultPerson);
  }
  useEffect(() => {
    if (focus?.current) {
      focus?.current.focus();
    }
  }, [focus]);

  const router = useRouter();

  useEffect(() => {
    if (values?.trim() !== "no") {
      router.push(`/search?values=${values}`);
    } else if (values === "no") {
      setValues(values);
    }
  }, [values, router]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="absolute translate-y-[16px] right-10 z-50 "
      >
        <IoMdFunnel size={22} className="text-primary" />
      </button>
      <div className=" w-full flex ">
        <div className={` ${buttonBack ? "block" : "hidden"} `}>
          <Link href={"../"}>
            <BackButton_md styles=" bg-white p-3 px-4 rounded-xl top-5 left-3 " />
          </Link>
        </div>
        <Link href="/search" className="w-full ">
          <div className="absolute translate-y-[3px] translate-x-1  z-10 bg-gradient-to-r from-[#FF5858] to-primary rounded-full p-3.5 ">
            <AiOutlineSearch size={22} color="#ffff" />
          </div>

          <input
            type="text"
            onChange={(e) => setValues(e.target.value)}
            ref={focus || undefined}
            placeholder="Search Job vacancy"
            className="relative shadow-md outline-none p-4 placeholder:text-md bg-whit rounded-2xl w-full pl-16 "
          />
        </Link>
      </div>

      <Sheet
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        snapPoints={[750, 400, 0]}
      >
        <Sheet.Container>
          <Sheet.Header />
          <div className="flex container justify-between pb-5 ">
            <button className=" text-primary text-lg">{"Filter"}</button>
            <button onClick={handleReset} className=" text-primary text-lg">
              {"Reset"}
            </button>
          </div>
          <Sheet.Content>
            <Filter
              reset={reset}
              setReset={setReset}
              selectedEmploymentType={selectedEmploymentType}
              selectedWorkLocation={selectedWorkLocation}
              selectedWorkSchedule={selectedWorkSchedule}
              setSelectedEmploymentType={setSelectedEmploymentType}
              setSelectedWorkLocation={setSelectedWorkLocation}
              setSelectedWorkSchedule={setSelectedWorkSchedule}
              setIsopen={setOpen}
            />
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
};
