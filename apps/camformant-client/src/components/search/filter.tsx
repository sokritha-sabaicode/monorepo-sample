"use client";

import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

const people = [
  { id: 1, name: "apple" },
  { id: 2, name: "Wade Cooper" },
  { id: 3, name: "Tanya Fox" },
  { id: 4, name: "Arlene Mccoy" },
  { id: 5, name: "Devon Webb" },
];

const experience = [
  { text: "No" },
  { text: "Less Than 1 year" },
  { text: "1-3 year" },
  { text: "3-5 year" },
  { text: "5 year up" },
];

interface FilterProps {
  reset?: number;
  setReset: (value: number) => void;
  selectedWorkSchedule:any;
  selectedEmploymentType:any;
  selectedWorkLocation:any;
  setSelectedWorkSchedule:(value:any)=>void;
  setSelectedEmploymentType:(value:any)=>void;
  setSelectedWorkLocation:(value:any)=>void;
  setIsopen:(value:boolean)=>void;
}

interface SelectProps {
  label: string;
  selected: any;
  setSelected: (value: any) => void;
  onClick?: (value: string) => void;
}

interface ExperienceProps {
  text: string;
}

const Experience: React.FC<ExperienceProps> = ({ text }) => {
  return (
    <div className="bg-gray-200 rounded-full px-4 py-2 w-full">{text}</div>
  );
};

const Select: React.FC<SelectProps> = ({
  label,
  onClick,
  selected,
  setSelected,
}) => {
  const handleSelection = (person: any) => {
    setSelected(person);
  };

  return (
    <div className="mt-7 ">
      <span className="font-semibold text-sm">{label}</span>
      <Listbox value={selected} onChange={handleSelection}>
        <div className="relative mt-5">
          <Listbox.Button
            onChange={() => onClick}
            className="flex items-center justify-between space-x-3 w-full py-2 px-4 rounded-lg text-gray-500 border border-gray-300"
          >
            <span className="block truncate">{selected.name}</span>
            <AiFillCaretDown
              className="h-4 w-4 text-gray-500"
              aria-hidden="true"
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 z-50 w-full overflow-auto rounded-lg bg-white shadow-lg">
              {people.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    ` py-2 px-2 ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? "font-medium" : "font-normal"
                          }`}
                      >
                        {person.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export const Filter: React.FC<FilterProps> = ({
   reset, setReset,selectedEmploymentType,selectedWorkLocation,selectedWorkSchedule,
   setSelectedWorkLocation,setSelectedEmploymentType,setSelectedWorkSchedule,setIsopen
  
  }) => {
  const defaultPerson = { id: 0, name: "default" };

  const onChangeSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReset(Number(e.target.value));
  };

  return (
    <div className=" flex flex-col justify-between w-full h-full ">
      <div className="container flex pt-7 flex-col overflow-y-scroll justify-center h-3/4 w-full ">

        <Select
          label="Work Schedule"
          selected={selectedWorkSchedule}
          setSelected={setSelectedWorkSchedule}
        />
        <Select
          label="Employment Type"
          selected={selectedEmploymentType}
          setSelected={setSelectedEmploymentType}
        />
        <Select
          label="Work Location"
          selected={selectedWorkLocation}
          setSelected={setSelectedWorkLocation}
        />

        <div className="mt-7">
          <label className="font-semibold text-sm">Experience</label>
          <div className="flex flex-wrap gap-4 mt-4">
            {experience.map((x) => {
              return (
                <div key={x.text}>
                  <Experience text={x.text} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="my-7">
          <label className="font-semibold text-sm"> Salary</label>
          <div className=" pt-5 ">
            <div className="w-full pb-2 ">0$ - {reset}$</div>

            <div className="w-full">
              <input
                className="w-full bg-primary"
                max={5000}
                type="range"
                value={reset}
                onChange={onChangeSalary}
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" p-4 flex border-t-2 justify-center items-center ">
        <button onClick={()=>setIsopen(false)} className="p-5 bg-primary w-full rounded-2xl text-white">Done</button>
      </div>
    </div>
  );
};
