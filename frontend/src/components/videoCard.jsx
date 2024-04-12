/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";


const VideoCard = ({ views, _id, title, thumbnail, owner,  }) => {


  return (
    <>
      <Link to={`/video/${_id}`}>
        <div className="video-card ">
          <div className="thumbnail">
            <img className="rounded-lg thumb-img" src={thumbnail?.url} alt="" />
          </div>
          <div className="flex gap-x-2">
            <div className="h-10 w-10 shrink-0">
              <img
                className="h-full w-full rounded-full "
                src={owner?.avatar}
                alt="avatar"
              />
            </div>
            <div className="w-full">
              <h3 className="mb-1 font-semibold">{title}</h3>
              <p className="flex text-sm text-gray-600">
                {" "}
                {views} views· 44agos
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