
import { ChannelComponent } from "../components";
import { useParams } from "react-router-dom";
import getChannelQuery from "../hooks/react-query/query/channel/getChannelQuery";
import getMyVideoQuery from "../hooks/react-query/query/channel/getMyVideoQuery";

const Channel = () => {

  const { userName } = useParams()

  const {data:channel} = getChannelQuery(userName)


  const {data:myData} = getMyVideoQuery(channel?._id)

  return (
    <>
   <ChannelComponent channel={channel}  myData={myData?.docs ?? []}/> 
    </>
  )
}

export default Channel