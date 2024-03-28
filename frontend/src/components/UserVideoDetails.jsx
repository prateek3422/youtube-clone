import React, { useState } from "react";
import videoService from "../services/VideoService";

const UserVideoDetails = ({item}) => {

    // console.log(item?._id)
    const [publish, SetPublish] = useState(item?.isPublished);



    const handlePublish = async () =>{
   
        try {
          const res = await videoService.toggleVideo(item?._id)
          SetPublish(res.data?.isPublished)

        } catch (error) {
          console.log(error)
        }
        }

  return (
    <div className="grid grid-cols-4 justify-between items-center border-2 h-12 rounded-lg mt-4 ml-4 mr-20 gap-1 "
    >
      <div className="flex justify-center  items-center">

        <input type="checkbox" defaultChecked={publish ? true :false} onClick={handlePublish} />

        <div className="text-white">
          {publish ? "unpublished" : "published"}
        </div>
      </div>
      <div className="  flex justify-center items-center text-white ">
        {item.title}
      </div>
      <div className=" flex justify-center items-center text-white">
        {item.likes.length}
      </div>
      <div className="flex justify-center items-center text-white">{`${item.createdAt.day}/${item.createdAt.month}/${item.createdAt.year}`}</div>
    </div>
  );
};

export default UserVideoDetails;
