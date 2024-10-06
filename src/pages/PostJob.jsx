import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";

import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { State } from "country-state-city";
import { useEffect, useState } from "react";
import { getCompanies } from "@/api/apiCompanies";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Select a Location" }),
  company_id: z.string().min(1, { message: "Select a Company" }),
  requirements: z.string().min(1, { message: "Requirements is required" }),
});
const PostJob = () => {
  const [company_id, setCompany_id] = useState("");
  const [location, setLocation] = useState("");
  const { isLoaded } = useUser();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "",
      company_id: "",
      requirements: "",
    },
    resolver: zodResolver(schema),
  });
  const {
    fetchData: fetchCompanies,
    data: companies,
    loading: companiesLoading,
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      fetchCompanies();
      console.log(companies);
    }
  }, [isLoaded]);
  return (
    <div>
      <h1 className="gradient-title font-extrabold text-5xl sm:7-xl text-center pb-8 ">
        Post a Job
      </h1>

      <form>
        <Input
          type="text"
          placeholder="Title"
          className="flex-1"
          {...register("title")}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </form>
      <Textarea placeholder="Job Description" {...register("description")} />
      {errors.description && (
        <p className="text-red-500">{errors.description.message}</p>
      )}
      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Fiter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }, index) => (
                <SelectItem value={name} key={index}>
                  {" "}
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.length > 0 &&
                companies.map(({ name, id }) => (
                  <SelectItem value={id} key={id}>
                    {name}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PostJob;
