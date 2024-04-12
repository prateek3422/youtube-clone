
import { Link, useNavigate, useParams } from "react-router-dom";
import videoService from "../services/VideoService";
import { BiLike } from "react-icons/bi";
import { Button, CommentSection, } from "../components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../utils/query-client.js";

const Videos = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // const [video, setVideo] = useState({});

  const fetchedVideo = async () => {
    try {
      if (slug) {
        const singleVideoData = await videoService.getSingeVideo(slug);
        // console.log(singleVideoData.data);
        // setVideo(singleVideoData.data);
        return singleVideoData.data;
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // like

  const handleLike = async () => {
    try {
      const like = await videoService.ToggleVideolikes(video?._id);
      // todo: dispatch to store
      return like;
    } catch (error) {
      console.log(error);
    }
  };

  // subscribe
  const handleSubscribe = async () => {
    try {
      const subs = await videoService.getSubscribe(video.owner?._id);
      // todo: dispatch to store

      return subs;
    } catch (error) {
      console.log(error);
    }
  };

  const { data: video } = useQuery({
    queryKey: ["video"],
    queryFn: fetchedVideo,
  });

  console.log(video)
  const { mutate: Like } = useMutation({
    mutationFn: handleLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["video"] });
    },
  });

  const { mutate: Subscribe } = useMutation({
    mutationFn: handleSubscribe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["video"] });
    },
  });

  return (
    <>
      <div className="container mx-auto">
        <div className="flex w-full flex-wrap lg:flex-nowrap gap-4 p-4">
          <div>
            <div className=" video flex justify-center  lg:ml-32">
              <video
                src={video?.videoFile?.url}
                controls
                autoPlay
                className="h-full w-full rounded-lg"
              ></video>

              {/* <VideoPlayer src={video.videoFile}/> */}
            </div>
            <div className=" mt-4 rounded-xl p-4  lg:ml-32">
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
                    <Link to={``}>
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
                    onClick={() => Subscribe()}
                    className=" px-4 py-1 rounded-2xl text-white"
                  >
                    {video?.owner?.isSubscribed ? "unsubscribe" : "subscribe"}
                  </Button>
                </div>
              </div>
              {/* <hr className="my-4 border-white" /> */}

              <div className="h-10 overflow-hidden group-focus:h-auto my-4">
                <p className="text-sm text-white">{video?.description}</p>
              </div>
            </div>
            {/* ===============comment section========== */}

            <CommentSection slug={slug} />
          </div>

          <div className="related-videos  w-full">related videos</div>
        </div>
      </div>
    </>
  );
};

export default Videos;
