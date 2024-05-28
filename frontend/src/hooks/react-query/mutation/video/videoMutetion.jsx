import { useMutation } from "@tanstack/react-query";

import { api } from "../../../../services/axios";

const videoMutetion = (data) => {
  return useMutation({
    mutationFn: () => {
      return api.post(`api/v1/videos/publishVideo`, data, {headers: {"content-type": "multipart/form-data",}}).then((res) => res?.data);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["video"] });
    },

  });
};

export default videoMutetion;
