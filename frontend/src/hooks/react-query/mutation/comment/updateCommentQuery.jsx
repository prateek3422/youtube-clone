import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { api } from "../../../../services/axios";
import { queryClient } from "../../../../utils/query-client";

const updateCommentQuery = (comment) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation({
    mutationFn: (commentId) => {
      return api
        .patch(`/api/v1/comments/c/${commentId}`, { content: comment })
        .then((res) => res?.data);
    },

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

export default updateCommentQuery;
