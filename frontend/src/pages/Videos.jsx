import { Link, useParams } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import { Button, CommentSection } from "../components";
import videoQuery from "../hooks/react-query/query/videos/videoQuery.jsx";
import toggleSubscribeQuery from "../hooks/react-query/mutation/subscribe/toggleSubscribeQuery.jsx";
import likeToggleQuery from "../hooks/react-query/mutation/Like/likeToggleQuery.jsx";
import Swal from 'sweetalert2/dist/sweetalert2.js'
const Videos = () => {
  const { slug } = useParams();
  const { data: video } = videoQuery(slug);
  
  const { mutate: subscribe } = toggleSubscribeQuery(
    video?.owner?._id,
    video?._id
  );
  const { mutate: Like } = likeToggleQuery(video?._id);

  return (
    <>
      <div className="container mx-auto">
        <div className="flex w-full flex-wrap lg:flex-nowrap gap-4 p-4">
          <div>
            <div className=" video flex justify-center  lg:mx-32">
              <video
                src={video?.videoFile?.url}
                controls
                autoPlay
                className=" rounded-lg"
              ></video>
            </div>
            <div className=" mt-4 rounded-xl p-4  lg:mx-32">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold">{video?.title}</h1>
                  <p className="flex  text-sm text-gray-200">
                    {video?.views} views . 18 hours ago
                  </p>
                </div>
                <Button
                  onClick={() => Like()}
                  className=" px-4 py-1 rounded-2xl flex items-center gap-1 text-white"
                >
                  <BiLike /> {video?.likeCount}
                </Button>
              </div>

              <div className=" mt-4 flex justify-between items-center">
                <div className="flex gap-x-4">
                  <div className="h-10 w-10 shrink-0">
                    <img
                      className="h-full w-full rounded-full "
                      src={video?.owner?.avatar}
                      alt="channel avatar"
                    />
                  </div>
                  <div className="block">
                    <Link to={`/channel/${video?.owner?._id}`}>
                      <p className="text-green-200">
                        {" "}
                        {video?.owner?.userName}
                      </p>
                    </Link>
                    <p className="text-sm text-green-200">
                      {video?.owner?.subscriberCount} Subscribers
                    </p>
                  </div>
                </div>

                <div className="block">
                  <Button
                    onClick={() => subscribe()}
                    className=" px-4 py-1 rounded-2xl text-white"
                 
                  >
                    {video?.owner?.isSubscribed ? "unsubscribe" : "subscribe"}
                  </Button>
                </div>
              </div>
              <hr className="my-4 border-white" />

              <div className="h-10 overflow-hidden group-focus:h-auto my-4">
                <p className="text-sm text-white">{video?.description}</p>
              </div>
            </div>
            {/* ===============comment section========== */}

            <CommentSection slug={slug} />
          </div>

          {/* <div className="related-videos ">related videos</div> */}
        </div>
      </div>
    </>
  );
};

export default Videos;
