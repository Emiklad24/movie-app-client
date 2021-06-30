/* eslint-disable import/no-anonymous-default-export */

export default {
  onUpdate: (registration) => {
    const waitingServiceWorker = registration.waiting;

    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener("statechange", (event) => {
        if (event.target.state === "activated") {
          waitingServiceWorker.postMessage({ type: "SKIP_WAITING" });
          localStorage.clear();
        }
      });
      //push new service worker to install
      waitingServiceWorker.postMessage({ type: "SKIP_WAITING" });
      localStorage.clear();
    }
  },
};
