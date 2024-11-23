import CreatedApplications from "@/components/CreatedApplications";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";

const MyApplications = () => {
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
        My Applications
      </h1>
      <CreatedApplications />
    </div>
  );
};

export default MyApplications;
