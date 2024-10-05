import { getJobs } from "@/api/apiAuth";
import { useSession } from "@clerk/clerk-react";
import { useEffect } from "react";

const JobListing = () => {
  const { session } = useSession();

  const fetchJobs = async () => {
    const supabaseAccessToken = await session.getToken({
      template: "supabase",
    });
    console.log(supabaseAccessToken);
    const data = await getJobs(supabaseAccessToken);
    console.log(data);
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  return <div>JobListing</div>;
};

export default JobListing;
