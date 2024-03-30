import { toast } from "react-toastify";


const handleError = (err) => {
  if (err && err.response) {
      const error =
        err.response.data?.data?.message ||
        err.response.data?.error ||
        err.response.data?.err ||
        (err.response.data?.data && err.response.data.data?.responseMessage);

      toast.error(error);
    // }
  } else if (err.message === "Network Error") {
    toast.error("It's not you, it's us. Please try again after some time");
  }
};

export default handleError;