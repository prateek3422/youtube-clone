import React, {useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { Button,  } from "../components";
import videoService from "../services/VideoService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../utils/query-client.js";
import Input from "./Inputs.jsx";

const CommentSection = ({ slug }) => {
  const [hide, setHide] = useState(true);
  const [commentText, setCommentText] = useState("");
  // ===========get comment =========0
  const fetchedComment = async () => {
    try {
      if (slug) {
        const commentData = await videoService.getVideoComments(slug);
        // console.log(commentData.data.docs)
        return commentData.data.docs;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =====CREATE COMMENT=======
  const handleCreateComment = async () => {
    try {
      if (commentText) {
        const newComment = await videoService.createComment(slug, commentText);

        return newComment;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ==========update comment ===========

  const handleDeleteComment = async (commentId) => {
    console.log(commentId);
    try {
      if (commentId) {
        const deleteComment = await videoService.deleteComment(commentId);
        return deleteComment;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { data: comment } = useQuery({
    queryKey: ["comment"],
    queryFn: fetchedComment,
  });

  const { mututate: createComment } = useMutation({
    mutationFn: handleCreateComment,
  });
  const { mutate: deleteComment } = useMutation({
    mutationFn: (_id) => handleDeleteComment(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment"] });
    },
  });
  // console.log(deleteComment);

  return (
    <>
      <div className=" mt-4  rounded-xl p-4 lg:ml-32 ">
        <div className="block">
          <h6>{comment?.length} comments</h6>

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
              <Button onClick={() => createComment()}>comment</Button>
            </div>
          </div>
        </div>
        <hr className="my-4 border-white" />

        {comment?.map((item) => (
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

                  <div className="">
                    <button className="mr-2">Edit</button>
                    <Button onClick={() => deleteComment(item?._id)}>
                      delete
                    </Button>
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
