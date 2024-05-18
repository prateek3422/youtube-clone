import React, { useState, useCallback } from "react";
import { Button } from "../components";
import videoService from "../services/VideoService";
import Input from "./Inputs.jsx";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import createCommentQuery from "../hooks/react-query/mutation/comment/createCommentQuery.jsx";
import deleteCommentQuery from "../hooks/react-query/mutation/comment/deleteCommentQuery.jsx";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash/debounce";

// StyledMenu component
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const CommentSection = ({ slug }) => {
  const [hide, setHide] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, commentId) => {
    setAnchorEl(event.currentTarget);
    setSelectedCommentId(commentId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedCommentId(null);
  };

  const fetchedComment = async () => {
    try {
      if (slug) {
        const commentData = await videoService.getVideoComments(slug);
        return commentData.data.docs;
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const { mutate: createComment } = createCommentQuery();
  const { mutate: deleteComment } = deleteCommentQuery();

  const { data: comments } = useQuery({
    queryKey: ["comment", slug],
    queryFn: fetchedComment,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const handleCreateComment = () => {
    createComment(slug, commentText , {
      onSuccess: () => {
        setCommentText("");
        setHide(true);
      },
      onError: (error) => {
        console.error("Error creating comment:", error);
      }
    });
  };

  const handleDeleteComment = (commentId) => {
    deleteComment({ id: commentId }, {
      onSuccess: () => {
        console.log(`Comment with id ${commentId} deleted successfully.`);
      },
      onError: (error) => {
        console.error("Error deleting comment:", error);
      }
    });
  };

  const debouncedSetCommentText = useCallback(
    debounce((value) => setCommentText(value), 300),
    []
  );

  const handleCommentTextChange = (e) => {
    debouncedSetCommentText(e.target.value);
  };

  return (
    <div className="mt-4 rounded-xl p-4 lg:mx-32">
      <div>
        <h6>{comments?.length || 0} comments</h6>
        <div className="flex flex-col items-end">
          <Input
            className="mt-4"
            type="text"
            placeholder="Add comment"
            value={commentText}
            onClick={() => setHide(false)}
            onChange={handleCommentTextChange}
          />
          <div className={`mt-2 flex ${hide ? "hidden" : ""}`}>
            <Button onClick={() => setHide(true)} className="mr-2">
              Cancel
            </Button>
            <Button onClick={handleCreateComment}>Comment</Button>
          </div>
        </div>
      </div>
      <hr className="my-4 border-white" />
      {comments?.map((item) => (
        <div key={item?._id}>
          <div className="flex gap-x-4">
            <div className="h-10 w-10 shrink-0">
              <img src={item?.owner?.avatar} alt="" />
            </div>
            <div className="flex justify-between items-center w-full">
              <div>
                <p className="text-green-200">{item?.owner?.fullname}</p>
                <p className="text-sm text-green-200">{item?.content}</p>
              </div>
              <div className="text-white">
                <div className="mt-2">
                  <div onClick={(e) => handleClick(e, item?._id)}>
                    <MoreVertIcon />
                  </div>
                  <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                      "aria-labelledby": "demo-customized-button",
                    }}
                    anchorEl={anchorEl}
                    open={open && selectedCommentId === item?._id}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose} disableRipple>
                      <EditIcon />
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleDeleteComment(item?._id);
                        handleClose();
                      }}
                      disableRipple
                    >
                      <DeleteIcon />
                      Delete
                    </MenuItem>
                  </StyledMenu>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-4 border-white" />
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
