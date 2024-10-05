import { getJobs } from "@/api/apiJobs";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";

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
  return <div>JobListing</div>;
};

export default JobListing;
