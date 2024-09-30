"use client";
import React, { useRef } from "react";
import { Search } from "../search/search";
// import { CategoryPosition } from "../category-position/category-position";
import SearchCard from "./search-card";

const SearchHomePage: React.FC = () => {
  const focusInput = useRef(null);
  const cata = [
    { title: "Graphic Design" },
    { title: "Marketing" },
    { title: "UX & UI" },
    { title: "Front End" },
    { title: "Back End" },
  ];

  return (
    <div className="pt-5">
      <div className="container">
        <Search focus={focusInput} buttonBack={true} />
      </div>
      {/* <div className="w-full flex gap-5 p-3 overflow-x-auto ">
        {cata.map((item) =>(
            <div >
                <CategoryPosition text={item.title} onClick={(()=>alert(item.title)) } />
            </div>
        ))}
      </div> */}
      <div className="w-full h-full">
        <SearchCard/>
      </div>
    </div>
  );
};

export default SearchHomePage;
