import { useQuery } from "@tanstack/react-query"
import { api } from "../../../../services/axios"


const getAllVudeo = () => {

    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery({
        queryKey:["Allvideo"],
        queryFn:() => api.get(`/api/v1/videos/getAllVideo/?page=1&limit=10`).then((data) => data?.data.data),
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      })
  
}

export default getAllVudeo