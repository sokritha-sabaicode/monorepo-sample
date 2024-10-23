import React, { Suspense, useEffect, useState } from "react";
import { Card } from "../card/card";
import axiosInstance from "@/utils/axios";
import { API_ENDPOINTS } from "@/utils/const/api-endpoints";
import { useDebounce } from "@/hooks/use-debounce";
import { FilterValueParams } from "@/components/in-search/search-home-page";
import SkeletonCard from "@/components/skeleton/skeleton-card";

const SearchCard = ({ searchValue, filterValues }: { searchValue: string, filterValues: FilterValueParams }) => {
  const [jobData, setJobData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [love, setLove] = useState<boolean>(true);

  // Debounced search value (waits 300ms after the user stops typing)
  const debouncedSearchValue = useDebounce(searchValue, 3000);

  const toggleFavorite = (jobId: string) => {
    setJobData((prevData: any) =>
      prevData.map((job: any) =>
        job._id === jobId ? { ...job, favorite: !job.favorite } : job
      )
    );
  };

  useEffect(() => {
    const fetchJobData = async () => {
      if (!debouncedSearchValue && isFilterEmpty(filterValues)) return;

      try {
        setLoading(true);

        const salary = {
          min_salary: filterValues.minSalary > 0 ? filterValues.minSalary : undefined,
          max_salary: filterValues.maxSalary > 0 ? filterValues.maxSalary : undefined,
        };

        const cleanedSalary = Object.fromEntries(
          Object.entries(salary).filter(([_, value]) => value !== undefined)
        );
        const filterSalary = Object.keys(cleanedSalary).length > 0 ? cleanedSalary : undefined;

        const filter = {
          schedule: filterValues.schedule || undefined,
          type: filterValues.type || undefined,
          workMode: filterValues.workMode || undefined,
          required_experience: filterValues.required_experience || undefined,
          salary: filterSalary,
        };

        const params: Record<string, any> = {
          limit: 5,
          sort: JSON.stringify({ createdAt: "desc" }),
          filter: JSON.stringify(filter),
        };

        if (debouncedSearchValue) {
          params.search = debouncedSearchValue;
        }

        const jobResponse = await axiosInstance.get(`${API_ENDPOINTS.JOBS}`, { params });
        const jobs = jobResponse?.data?.data?.jobs || [];
        setJobData(jobs);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch job data");
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [debouncedSearchValue, filterValues]);

  const isFilterEmpty = (filterValues: FilterValueParams) => {
    return (
      !filterValues.schedule &&
      !filterValues.type &&
      !filterValues.workMode &&
      !filterValues.required_experience &&
      filterValues.minSalary === 0 &&
      filterValues.maxSalary === 0
    );
  };

  if (!searchValue && isFilterEmpty(filterValues)) {
    return null;
  }

  return (
    <Suspense>
      <div className="flex flex-col pt-6 pb-20 gap-4 w-full h-full">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div className="mb-2 p-1" key={index}>
              <SkeletonCard />
            </div>
          ))
        ) : jobData.length === 0 ? (
          // Display this section when no jobs are found
          <div className="flex flex-col items-center justify-center mt-10">
            {/* <img
              src="/no-jobs-found.png"
              alt="No jobs found"
              className="w-64 h-64"
            /> */}
            <h2 className="text-lg font-semibold text-gray-700 mt-5">
              No Jobs Found
            </h2>
            <p className="text-gray-500 text-center max-w-md mt-2">
              We could not find any jobs matching your criteria. Try clearing the
              filters or search with different keywords.
            </p>

          </div>
        ) : (
          jobData.map((job: any, index: any) => (
            <div key={index} className="container">
              <Card
                _id={job._id}
                title={job.title}
                position={job.position}
                profile={job?.companyId?.profile || "defaultProfileUrl"}
                min_salary={job.min_salary}
                max_salary={job.max_salary}
                job_opening={job.job_opening}
                type={job.type}
                schedule={job.schedule}
                location={job.location}
                deadline={new Date(job.deadline)}
                heart={job.favorite}
                setHeart={() => toggleFavorite(job._id)}
              />
            </div>
          ))
        )}
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </Suspense>
  );
};

export default SearchCard;
