import { socketURL } from "../FeathersClient";

export const loginPopupHandler = (e) => {
  if (e) e.preventDefault();
  window.location.replace(`${socketURL}/connect/google`);
};

// `scrollbars=no,resizable=no,status=no,location=yes,toolbar=no,menubar=no,
// width=600,height=700,left=200,top=200`
