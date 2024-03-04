import React, { useEffect, useState } from 'react'
import videoService from '../services/VideoService';
import { useSelector } from 'react-redux';
import authService from '../services/auth';

const MyContent = () => {

  const [myData, setMyData] = useState({})
  const [channel, setChannel] = useState({})
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData.data?.userName);

  console.log(channel)


useEffect(() => {
  (async() =>{
    try {
      const userId = userData.data?._id;
      console.log(userId)
      const videoData = await videoService.getMyVideos(userId)
      setMyData(videoData.data?.data?.docs)
    } catch (error) {
      console.log(error)
    }
  })()
    
  }, [])

  useEffect(()=>{
    (async()=>{
    try {
      const username =userData.data?.userName
      console.log(username)
        const getChannelDetail = await authService.getChannelDetails(username)
        // console.log(getChannelDetail.data.data)
        setChannel(getChannelDetail.data.data)
    } catch (error) {
      console.log(error)
    }
    })()
  },[])
  
  return (
    <>
   <div className="container">
    <div className="coverImg">
      <img src={channel?.coverImage} alt="" />
    </div>
    </div> 
    </>
  )
}

export default MyContent