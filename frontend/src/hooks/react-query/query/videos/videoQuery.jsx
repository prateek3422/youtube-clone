import { api } from "../../../../services/axios";
import { useQuery } from "@tanstack/react-query";

const videoQuery = (slug) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["video"] ,
    queryFn: () => api.get(`/api/v1/videos/${slug}`).then((data) =>data?.data?.data),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

}
export default videoQuery;
