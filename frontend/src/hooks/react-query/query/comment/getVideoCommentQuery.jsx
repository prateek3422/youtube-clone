import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../services/axios";

const getVideoCommentQuery = (videoId,) => {
  // console.log(videoId)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["comment", [videoId]],
    queryFn: () => api.get(`/api/v1/comments/${videoId}`).then((data) => data?.data.data),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default getVideoCommentQuery;
