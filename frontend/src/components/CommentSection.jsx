import React, { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { Input } from "../components";
import videoService from "../services/VideoService";

const CommentSection = ({ slug }) => {
  const [comment, setComment] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [hide, setHide] = useState(true);



  useEffect(() => {
    (async () => {
      try {
        if (slug) {
          const commentData = await videoService.getVideoComments(slug);
          // console.log(commentData.data.docs)
          setComment(commentData.data.docs);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [comment]);

  const handleCreateComment = async () => {
    try {
      if (commentText) {
        const comment = await videoService.createComment(slug, commentText);
        console.log(comment);
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <>
      <div className="border-white mt-4 border-2 rounded-xl p-4 ml-32 ">
        <div className="block">
          <h6>{comment.length} comments</h6>

          <div className="flex flex-col items-end">
            <Input
              className="mt-4"
              type="text"
              placeholder="add comment"
              value={commentText}
              onClick={() => setHide(false)}
              onChange={(e) => setCommentText(e.target.value)}
            />

            <div className={`mt-2 ${hide ? "hidden" : ""}`}>
              <button onClick={() => setHide(true)} className="mr-2">
                cancel
              </button>
              <button onClick={handleCreateComment}>comment</button>
            </div>
          </div>
        </div>
        <hr className="my-4 border-white" />

        {comment.map((item) => (
          <div key={item?._id}>
            <div className="flex gap-x-4">
              <div className="h-10 w-10 shrink-0">
                <img src={item?.owner?.avatar} alt="" />
              </div>
              <div className="flex justify-between items-center w-full">
                <div className="block">
                  <p className="text-green-200">{item?.owner?.fullname}</p>
                  <p className="text-sm text-green-200">{item?.content}</p>
                </div>
                <div className="">
                  <CiMenuKebab />
                  <div className="  hidden">
                    <button className="mr-2">cancel</button>
                    <button onClick={handleCreateComment}>comment</button>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-4 border-white" />
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentSection;
