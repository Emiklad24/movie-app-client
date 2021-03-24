import { globalStoreName } from "./storeLocalStorageNames";
import produce from "immer";
import { version } from "../../package.json";

//store version control
const isRunningInBrowser = () => typeof window !== "undefined";

let _grandStorePersist = JSON.parse(localStorage.getItem(globalStoreName));

if (_grandStorePersist === null) {
  localStorage.setItem(globalStoreName, JSON.stringify({ version }));
  _grandStorePersist = { version };
}
if (version > _grandStorePersist.version) {
  localStorage.setItem(globalStoreName, JSON.stringify({ version }));
}
export const persist2 = (namespace, config) => (set, get, api) => {
  const state = config(
    (args) => {
      set(produce(args));
      if (isRunningInBrowser) {
        _grandStorePersist[namespace] = get();
        localStorage.SIMPLE_MOVIE_APP_GLOBAL_STORE = JSON.stringify(
          _grandStorePersist
        );
      }
    },
    get,
    api
  );

  return {
    ...state,
    ...(isRunningInBrowser() && _grandStorePersist[namespace]),
  };
};
