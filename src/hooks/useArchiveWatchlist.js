import { useMutation } from "react-query";
import { editWatchList } from "../services/editWatchList.service";
import { editWatchListkey } from "../util/appCacheKeys";
import { queryClient } from "../util/misc";
import swal from "sweetalert";
import { toast } from "react-toastify";
import useUserCredentialsStore from "../store/auth.store";
import shallow from "zustand/shallow";

export default function useArchiveMovieWatchlist(movie, query) {
  const { isAuthenticated } = useUserCredentialsStore(
    (state) => ({
      isAuthenticated: state.isAuthenticated,
      userDetails: state.userDetails,
    }),
    shallow
  );

  const { isLoading, mutate } = useMutation({
    mutationFn: editWatchList,
    mutationKey: editWatchListkey,

    onSuccess: () => {
      queryClient.refetchQueries();
    },

    onError: () => {
      toast.error(`Delete failed, please try again`);
    },
  });

  const deleteWatchlistHandler = async () => {
    if (!isAuthenticated) {
      swal("you have to log in to delete a watchlist");
    } else {
      const movieName =
        movie?.title || movie?.original_name || movie?.original_title;
      swal({
        title: `You are about to archive "${movieName}"`,
        text: `"${movieName}" will be removed from your active watchlist`,
        buttons: ["Cancel", ` Archive "${movieName}" `],
        dangerMode: true,
      }).then((willRemove) => {
        if (willRemove) {
          mutate({ id: movie?.id, query: query });
        }
      });
    }
  };

  return {
    isLoadingDelete: isLoading,
    mutate,
    deleteWatchlistHandler,
  };
}
