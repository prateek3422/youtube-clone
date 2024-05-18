import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../services/axios";

const getSubscribeQuery = (channelId) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["subscribe"],
    queryFn: () =>
      api
        .get(`/api/v1/subscriptions/c/${channelId}`)
        .then((data) => data?.data.data),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default getSubscribeQuery;
