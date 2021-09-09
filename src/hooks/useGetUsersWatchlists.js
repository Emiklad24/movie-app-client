import { useQuery } from "react-query";
import { fetchUserWatchList } from "../services/fetchUserWatchlist.service";
import { fetchWatchListsKey } from "../util/appCacheKeys";

const useGetUsersWatchlists = (query) => {
  const { data, isLoading, isError, isFetched, isSuccess } = useQuery({
    queryFn: fetchUserWatchList,
    queryKey: [fetchWatchListsKey, { ...query }],
  });

  return {
    data,
    isLoading,
    isError,
    isFetched,
    isSuccess,
  };
};

export default useGetUsersWatchlists;
