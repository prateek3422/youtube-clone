import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../services/axios";
import { toast } from "react-toastify";
import { queryClient } from "../../../../utils/query-client";


const createCommentQuery = (videoId ) => {

  // console.log(videoId)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation({
    mutationFn: (data) => { 
      return api.post(`/api/v1/comments/${videoId}`, {content : data}).then((res) => res?.data)},

    onError: (error) => {
      console.log(error);
    },
      onSuccess: (data) => {
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false, 
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      queryClient.invalidateQueries({ queryKey: ["comment"] });
    },
  });
};

export default createCommentQuery;
