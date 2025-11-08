import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api.js";

const useAuthUser = () => {
  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });

  return {
    // boolean while the initial fetch is in progress
    isLoading: query.isLoading,
    // boolean while any background refetch is running
    isFetching: query.isFetching,
    // the resolved user object or null
    authUser: query.data?.user ?? null,
    // forward error and refetch for callers that need them
    error: query.error,
    refetch: query.refetch,
  };
};

export default useAuthUser;