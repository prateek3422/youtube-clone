import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const VideoCard = ({ views, _id, title, thumbnail, owner }) => {
  return (
    <>
      <div className="video-card ">
        <Link to={`/video/${_id}`}>
          <div className="thumbnail">
            <img className="rounded-lg thumb-img" src={thumbnail?.url} alt="" />
          </div>
        </Link>
        <div className="flex gap-x-2 mt-2">
          <Avatar
            alt="channel avatar"
            src={owner?.avatar}
            sx={{ width: 40, height: 40 }}
          />

          <div className="w-full">
            <h3 className="mb-1 font-semibold">{title}</h3>
            <Link
              to={`/channel/${owner?._id}`}
              className="mb-1 text-sm text-gray-600 cursor-pointer"
            >
              {owner?.userName}
            </Link>
            <p className="flex text-sm text-gray-600"> {views} views· 44agos</p>
            <p className="text-sm text-gray-600"></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
