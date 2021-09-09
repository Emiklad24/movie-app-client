import shallow from "zustand/shallow";
import useUserCredentialsStore from "../store/auth.store";
import useGetUsersWatchlists from "./useGetUsersWatchlists";

const useGetWatchlistsIds = () => {
  const { userDetails } = useUserCredentialsStore(
    (state) => ({
      userDetails: state?.userDetails,
    }),
    shallow
  );

  const { data } = useGetUsersWatchlists({
    users_permissions_user: userDetails?.id,
  });

  const watchlists = data || userDetails?.watchlists || [];

  let ids = [];

  for (let i = 0; i < watchlists?.length; i++) {
    ids = [...ids, watchlists?.[i]?.movieId || watchlists?.[i]];
  }

  return {
    ids,
  };
};

export default useGetWatchlistsIds;
