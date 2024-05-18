import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../services/axios';

const getSubscribedChannelQuery = (subscriberId) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery({
        queryKey: ["subscribedChannel"],
        queryFn: () =>
          api
            .get(`/api/v1/subscriptions/u/${subscriberId}`)
            .then((data) => data?.data.data),
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      });
}

export default getSubscribedChannelQuery