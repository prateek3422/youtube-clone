import { useQuery } from "@tanstack/react-query"
import { api } from "../../../../services/axios"


const getMyVideo = (userId) => {
  
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery({
        queryKey:["Myvideo"],
        queryFn:() => api.delete( `/api/v1/videos/getAllVideo/?page=1&limit=10&userId=${userId}`).then((data) => data?.data.data),
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      })
  
}

export default getMyVideo