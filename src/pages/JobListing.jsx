import { getJobs } from "@/api/apiJobs";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobCard from "@/components/JobCard";

const JobListing = () => {
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoaded } = useUser();

  const { fetchData, data, loading } = useFetch(getJobs);

  console.log(data);
  useEffect(() => {
    if (isLoaded) fetchData();
    console.log(data);
  }, [isLoaded, location, searchQuery, company_id]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl lg:text-8xl text-center pb-8">
        Latest Jobs
      </h1>
      {loading ? (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      ) : (
        ""
      )}

      {loading === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.length ? (
            data.map((data) => <JobCard key={data.id} job={data} />)
          ) : (
            <div>No Jobs Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
