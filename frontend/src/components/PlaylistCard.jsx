import React, { useEffect, useState } from "react";
import videoService from "../services/VideoService";

const PlaylistCard = ({ userId }) => {
  // console.log(userId)
  const [playlist, setPlaylist] = useState([]);
  // console.log(playlist)

  useEffect(() => {
    (async () => {
      try {
        const playlist = await videoService.userplaylist(userId)
        // console.log(playlist.data),
        setPlaylist(playlist.data)
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return(
    <>
     {
      playlist?.map((item) =>{
        // console.log(item)
        return(
          item?.length!==0?(
        <div className="video-card" key={item._id}>
          <div className="thumbnail">
            <img className="rounded-lg thumb-img" src="" alt="" />
          </div>
          <div className="flex">
            {/* <div className="h-10 w-10 shrink-0">
              <img
                className="h-full w-full rounded-full "
                // src={owner?.avatar}
                alt="avatar"
              />
            </div> */}
            <div className="w-full">
              <h3 className="mb-1 font-semibold"></h3>
              <p className="flex text-xl text-gray-600">
                {item?.name}
              </p>
              <p className="text-sm text-gray-600">{item?.description}</p>
            </div>
          </div>
        </div>):"playlist not available"
        )
      })
     }
    </>
  )
};

export default PlaylistCard;
