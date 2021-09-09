import shallow from "zustand/shallow";
import useUserCredentialsStore from "../store/auth.store";
import swal from "sweetalert";

export const useLogoutUser = () => {
  const { reset } = useUserCredentialsStore(
    (state) => ({
      reset: state.reset,
    }),
    shallow
  );

  const logoutHandler = (e) => {
    e.preventDefault();
    swal({
      title: ` Logout`,
      text: `Are you sure ?`,
      buttons: ["No", "Sure"],
      dangerMode: true,
    }).then((willLogin) => {
      if (willLogin) {
        reset();
      }
    });
  };

  return {
    logoutHandler,
  };
};
