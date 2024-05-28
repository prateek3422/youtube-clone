import { api } from "../../../../services/axios";
import { useQuery } from "@tanstack/react-query";

const getMyVideoQuery = (userId) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  return useQuery({
    queryKey: [ userId],
    queryFn: () =>
      api
        .get(`/api/v1/videos/getAllVideo/?page=1&limit=10&userId=${userId}`)
        .then((data) => data?.data.data),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default getMyVideoQuery;
