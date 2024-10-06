import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const { session } = useSession();

  const fetchData = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });
      const data = await cb(supabaseAccessToken, options, ...args);
      setData(data);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { fetchData, data, loading, error };
};

export default useFetch;
