import React, { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { Button, Input } from "../components";
import videoService from "../services/VideoService";

const CommentSection = ({ slug }) => {
  const [comment, setComment] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [hide, setHide] = useState(true);


// console.log(comment)
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
  }, []);

  const handleCreateComment = async () => {
    try {
      if (commentText) {
        const newComment = await videoService.createComment(slug, commentText);
        // setComment([...comment, newComment?.data.data])
        // console.log(comment);
        // setComment("")
        // console.log(newComment)
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <>
      <div className=" mt-4  rounded-xl p-4 lg:ml-32 ">
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
              <Button onClick={() => setHide(true)} className="mr-2">
                cancel
              </Button>
              <Button onClick={handleCreateComment}>comment</Button>
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
                <div className="text-white">
                  <CiMenuKebab />
                  <div className="  hidden">
                    <Button className="mr-2">cancel</Button>
                    <Button onClick={handleCreateComment}>comment</Button>
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


