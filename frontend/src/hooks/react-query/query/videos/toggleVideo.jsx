/* eslint-disable no-undef */
import { api } from "../../../../services/axios"


const toggleVideo = (videoId) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery({
        queryKey:["toggleVideo"],
        queryFn:() => api.patch(`api/v1/videos/toggle/publish/${videoId}`).then((data) => data?.data.data),
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      })
  

}

export default toggleVideo