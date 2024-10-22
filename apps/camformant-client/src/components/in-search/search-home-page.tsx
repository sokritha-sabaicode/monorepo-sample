"use client";

import React, { useEffect, useRef, useState } from "react";

import { CategoryPosition } from "@/components/category-position/category-position";
import { useAuth } from "@/context/auth";
import axiosInstance from "@/utils/axios";
import { API_ENDPOINTS } from "@/utils/const/api-endpoints";
import SearchCard from "@/components/in-search/search-card";
import { Search } from "@/components/search/search";

export interface FilterValueParams {
  schedule: string;
  type: string;
  workMode: string;
  required_experience: string;
  minSalary: number;
  maxSalary: number;
}

export const defaultFilterValue: FilterValueParams = {
  schedule: "",
  type: "",
  workMode: "",
  required_experience: "",
  minSalary: 0,
  maxSalary: 0
};

const SearchHomePage: React.FC = () => {
  const { user } = useAuth();
  const focusInput = useRef(null);

  const [searchValue, setSearchValue] = useState<string>("");
  const [filterValues, setFilterValues] = useState(defaultFilterValue);

  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchTrending, setSearchTrending] = useState<string[]>([]);


  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const searchHistory = await axiosInstance.get(API_ENDPOINTS.SEARCH_HISTORY);
        setSearchHistory(searchHistory.data.data);
      } catch (error) {
        console.error("fetchSearchHistory() method error::: ", error);
      }
    };

    fetchSearchHistory();
  }, [user]);

  useEffect(() => {
    const fetchSearchTrending = async () => {
      try {
        const searchTrending = await axiosInstance.get(API_ENDPOINTS.SEARCH_TRENDING);
        setSearchTrending(searchTrending.data.data);
      } catch (error) {
        console.error("fetchSearchTrending() method error::: ", error);
      }
    };

    fetchSearchTrending();
  }, []);

  return (
    <div className="pt-5">
      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <div className="mb-6">
          <Search focus={focusInput} buttonBack={true} setSearchValue={setSearchValue} setCompleteFilter={setFilterValues} isFilterDisplay={true} />
        </div>

        {/* Recent Searches Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Recent Searches</h2>
          <div className="w-full flex gap-3 p-3 overflow-x-auto">
            {searchHistory.length > 0 ? (
              searchHistory.map((item, index) => (
                <div key={index} className="min-w-max">
                  <CategoryPosition
                    text={item}
                    onClick={() => setSearchValue(item)}
                    className="bg-gray-100 px-4 py-2 rounded-lg shadow hover:bg-gray-200 transition duration-300 ease-in-out cursor-pointer"
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500">No recent searches found.</p>
            )}
          </div>
        </div>

        {/* Trending Searches Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Trending Searches</h2>
          <div className="w-full flex gap-3 p-3 overflow-x-auto">
            {searchTrending.length > 0 ? (
              searchTrending.map((item, index) => (
                <div key={index} className="min-w-max">
                  <CategoryPosition
                    text={item}
                    onClick={() => setSearchValue(item)}
                    className="bg-gray-100 px-4 py-2 rounded-lg shadow hover:bg-gray-200 transition duration-300 ease-in-out cursor-pointer"
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500">No trending searches found.</p>
            )}
          </div>
        </div>

        {/* Search Results */}
        <div className="w-full h-full">
          <SearchCard searchValue={searchValue} filterValues={filterValues} />
        </div>
      </div>
    </div>
  );
};

export default SearchHomePage;
