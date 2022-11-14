import { toast } from "react-toastify";

export const Notify = (
    msg = "",
    type = "warn",
    position = toast.POSITION.TOP_LEFT
  ) => {
    switch (type) {
      case "info":
        toast.info(msg || "Info Notification !", {
          position,
        });
        break;
      case "success":
        toast.success(msg || "Success Notification !", {
          position,
        });
        break;
      case "error":
        toast.error(msg || "Error Notification !", {
          position,
        });
        break;
      case "warn":
        toast.warn(msg || "Warning Notification !", {
          position,
        });
        break;

      default:
        toast.info(msg || "Info Notification !", {
          position,
        });
    }
  };