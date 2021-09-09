import { useQuery } from "react-query";
import useUserCredentialsStore from "../store/auth.store";
import { refreshUserDetails } from "../services/refreshUserDetails.service";
import { refreshUserDetailskey } from "../util/appCacheKeys";
import shallow from "zustand/shallow";

export const useRefreshUserDetails = () => {
  const { isAuthenticated, userDetails } = useUserCredentialsStore(
    (state) => ({
      isAuthenticated: state.isAuthenticated,
      userDetails: state.userDetails,
    }),
    shallow
  );

  const { data, isLoading, error, isFetching } = useQuery(
    refreshUserDetailskey,
    refreshUserDetails,
    {
      enabled: isAuthenticated,
      refetchInterval: 10000,

      initialData: userDetails,
    }
  );

  return {
    data,
    isLoading,
    error,
    isFetching,
  };
};
