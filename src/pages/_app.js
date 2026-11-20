import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { MantineProvider } from "@mantine/core";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "@mantine/core/styles.css";
import "@/styles/login.css";
import "@/styles/header.css";
import "@/styles/style.css";
import "@/App.css";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const toastRef = useRef();
  const router = useRouter();

  useEffect(() => {
    window.showGlobalToast = (message = "Done!") => {
      const toastElement = toastRef.current;
      if (!toastElement || !window.bootstrap) return;

      toastElement.querySelector(".toast-body").textContent = message;
      const toast = new window.bootstrap.Toast(toastElement, {
        delay: 2500,
        autohide: true,
      });
      toast.show();
    };
  }, []);

  useEffect(() => {
    const removeStaleBackdrops = () => {
      document
        .querySelectorAll(".modal-backdrop, .swal2-container.swal2-backdrop-show")
        .forEach((element) => element.remove());
      document.body.classList.remove("modal-open", "swal2-shown", "swal2-height-auto");
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("padding-right");
    };

    router.events.on("routeChangeStart", removeStaleBackdrops);
    router.events.on("routeChangeComplete", removeStaleBackdrops);

    return () => {
      router.events.off("routeChangeStart", removeStaleBackdrops);
      router.events.off("routeChangeComplete", removeStaleBackdrops);
    };
  }, [router.events]);

  return (
    <MantineProvider>
      <div
        ref={toastRef}
        className="toast hide position-fixed bottom-0 end-0 m-3"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="me-auto">Notification</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">Loading...</div>
      </div>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
