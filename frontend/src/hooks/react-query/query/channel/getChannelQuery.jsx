import { useQuery } from '@tanstack/react-query'
import { api } from '../../../../services/axios';

const getChannelQuery = (userName) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["channel",userName],
    queryFn: () =>api.get(`/api/v1/users/c/${userName}`).then((data) => data?.data.data),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export default getChannelQuery