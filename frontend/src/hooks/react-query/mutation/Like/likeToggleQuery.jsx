import { useMutation } from '@tanstack/react-query'
import { api } from '../../../../services/axios'
import { queryClient } from '../../../../utils/query-client'
import { toast } from 'react-toastify'


const likeToggleQuery = (videoId) => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation({
    mutationFn: () =>  api.post(`/api/v1/likes/toggle/v/${videoId}`).then((res) =>  res?.data),
    

    onError:(error) =>{
      console.log(error)
    },
    onSuccess:(data) =>{
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

        queryClient.invalidateQueries({ queryKey: [videoId] });
    }
  })
}

export default likeToggleQuery