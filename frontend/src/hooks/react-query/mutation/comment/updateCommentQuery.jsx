import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { api } from "../../../../services/axios";

const updateCommentQuery = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation({
    mutationFn: (commentId,comment) => {
     console.log(commentId, comment)
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
    },
  });
};

export default updateCommentQuery;
