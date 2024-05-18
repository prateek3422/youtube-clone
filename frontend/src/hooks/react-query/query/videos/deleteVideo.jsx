import { api } from "../../../../services/axios"
import { useQuery } from "@tanstack/react-query"

const deleteVideo = (videoId) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery({
        queryKey:["deleteVideo"],
        queryFn:() => api.delete(`api/v1/videos/${videoId}`).then((data) => data?.data.data),
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      })
  
}



export default deleteVideo