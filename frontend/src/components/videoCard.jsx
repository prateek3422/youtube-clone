import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VideoCard = ({views, _id,title, thumbnail, owner,createdAt
}) => {
  // console.log(owner);
  return (
    <>
      <Link to={`/video/${_id}`}>
        <div className="video-card">
          <div className="thumbnail">
            <img className="rounded-lg thumb-img" src={thumbnail} alt="" />
          </div>
          <div className="flex gap-x-2">
            <div className="h-10 w-10 shrink-0">
              <img
                className="h-full w-full rounded-full "
                src="	https://images.pexels.com/photos/3532545/pexels-ph…jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </div>
            <div className="w-full">
              <h3 className="mb-1 font-semibold">{title}</h3>
              <p className="flex text-sm text-gray-600">
                {" "}
               {views} views· 44min
              </p>
              <p className="text-sm text-gray-600"></p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default VideoCard;
