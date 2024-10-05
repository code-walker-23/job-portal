import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function applyToJob(token, _, jobData) {
  const supabase = await supabaseClient(token);
  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${jobData.candidate_id}`;
  const { error: storageError } = await supabase.storage
    .from("candidates_resume")
    .upload(fileName, jobData.resume);

  if (storageError) {
    console.error("Error Uploading Resume:", storageError);
    return null;
  }

  const resume = `${supabaseUrl}/storage/vi/object/public/resumes/${fileName}`;

  const { data, error: applicationSubmittingError } = await supabase
    .from("applications")
    .insert([
      {
        ...jobData,
        resume,
      },
    ])
    .select();

  if (applicationSubmittingError) {
    console.error("Error Submitting the Application:", storageError);
    return null;
  }
  return data;
}