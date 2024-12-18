/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { getSingleJob, updateHiringStatus } from "@/api/apiJobs";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import MDEditor from "@uiw/react-md-editor";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ApplyJobDrawer from "@/components/ApplyJobDrawer";
import ApplicationCard from "@/components/ApplicationCard";

const Job = () => {
  const { user, isLoaded } = useUser();
  const { id } = useParams();

  const {
    loading: loadingJob,
    data: job,
    fetchData: fetchJob,
  } = useFetch(getSingleJob, { job_id: id }); // instead of passing the job_id here we can pass it with the fetchJob()

  const {
    loading: loadingHiringStatus,
    data: hiringStatus,
    fetchData: fetchHiringStatus,
  } = useFetch(updateHiringStatus, { job_id: id });

  const handleHiringStatusChange = (value) => {
    const isOpen = value === "open";
    fetchHiringStatus(isOpen).then(() => fetchJob());
  };

  useEffect(() => {
    if (isLoaded) fetchJob(); // wen want to fetch the job only when user status changes
  }, [isLoaded]);

  console.log(job);

  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
          {job?.title}
        </h1>
        <img
          src={job?.company?.logo_url}
          className="h-12"
          alt={job?.title}
        ></img>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <MapPinIcon />
          {job?.location}
        </div>
        <div className="flex gap-2">
          <Briefcase />
          {job?.applications?.length} Applicants
        </div>
        <div className="flex gap-2">
          {job?.isOpen ? (
            <>
              <DoorOpen /> Open
            </>
          ) : (
            <>
              <DoorClosed /> Closed
            </>
          )}
        </div>
      </div>

      {/* hiring status */}
      {loadingHiringStatus && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      {job?.recruiter_id === user?.id && (
        <Select onValueChange={handleHiringStatusChange}>
          <SelectTrigger
            className={`w-full ${job?.isOpen ? "bg-green-950" : "bg-red-950"}`}
          >
            <SelectValue
              placeholder={
                "Hiring Status" + (job?.isOpen ? "( Open )" : "( Closed )")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"open"}>Open</SelectItem>
            <SelectItem value={"closed"}>Closed</SelectItem>
          </SelectContent>
        </Select>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold">About the Job</h2>
      <p>{job?.description}</p>

      <h2 className="text-2xl sm:text-3xl font-bold">
        What we are looking for
      </h2>

      <MDEditor.Markdown
        source={job?.requirements}
        className="bg-transparent sm:text-lg"
      />

      {job?.recruiter_id !== user?.id && (
        <ApplyJobDrawer
          job={job}
          user={user}
          fetchJob={fetchJob}
          applied={job?.applications?.find(
            (app) => app.candidate_id === user.id
          )}
        />
      )}

      {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold">Applications</h2>

          {job.applications.map((app) => {
            return <ApplicationCard key={app.id} application={app} job={job} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Job;
