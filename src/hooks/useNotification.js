import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useNotification = () => {
  const showNotification = (message, type, autoClose = 2000) => {
    const isMobile = window.innerWidth <= 767;

    if (type === "success") {
      toast.success(message, {
        position: isMobile ? "top-right" : "bottom-right",
        className: "toast-custom",
        theme: "colored",
        pauseOnHover: false,
        autoClose: autoClose,
        onClose: () => {
          if (autoClose !== false) {
            setTimeout(() => {
              window.location.reload();
            }, autoClose);
          }
        },
      });
    } else if (type === "error") {
      toast.error(message, {
        position: isMobile ? "top-right" : "bottom-right",
        className: "toast-custom",
        theme: "colored",
        autoClose: autoClose,
        onClose: () => {
          if (autoClose !== false) {
            setTimeout(() => {
              window.location.reload();
            }, autoClose);
          }
        },
      });
    } else if (type === "warning") {
      toast.warning(message, {
        position: isMobile ? "top-right" : "bottom-right",
        className: "toast-custom",
        theme: "colored",
        autoClose: 5000,
      });
    }
  };

  return showNotification;
};

export default useNotification;
