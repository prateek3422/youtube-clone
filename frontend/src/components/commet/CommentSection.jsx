import React, { useState } from "react";
import { Button } from "../index.js";
import Input from "../Inputs.jsx";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import createCommentQuery from "../../hooks/react-query/mutation/comment/createCommentQuery.jsx";
import deleteCommentQuery from "../../hooks/react-query/mutation/comment/deleteCommentQuery.jsx";
import getVideoCommentQuery from "../../hooks/react-query/query/comment/getVideoCommentQuery.jsx";
import updateCommentQuery from "../../hooks/react-query/mutation/comment/updateCommentQuery.jsx";
// eslint-disable-next-line react/prop-types
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

// eslint-disable-next-line react/prop-types
const CommentSection = ({ slug }) => {
  const [hide, setHide] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [updateCommentText, setUpdateCommentText] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { mutate: createComment } = createCommentQuery(slug, commentText);

  const { mutate: deleteComment } = deleteCommentQuery();
  const { data: comment } = getVideoCommentQuery(slug);

  const { mutate: updateComment } = updateCommentQuery(updateCommentText);

  const handleEdit = (commentId) => {
    setEditMode(true);
    setEditId(commentId);
    // updateComment(commentId);
  };

  return (
    <>
      <div className=" mt-4  rounded-xl p-4 lg:mx-32 ">
        <div className="block">
          <h6>{comment?.length} comments</h6>

          <div className="flex flex-col items-end">
            {editMode ? (
              <Input
                className="mt-4"
                type="text"
                placeholder="update comment"
                value={updateCommentText}
                onClick={() => setHide(false)}
                onChange={(e) => setUpdateCommentText(e.target.value)}
              />
            ) : (
              <Input
                className="mt-4"
                type="text"
                placeholder="add comment"
                value={commentText}
                onClick={() => setHide(false)}
                onChange={(e) => setCommentText(e.target.value)}
              />
            )}
            <div className={`mt-2 flex ${hide ? "hidden" : ""}`}>
              <Button onClick={() => setHide(true)} className="mr-2">
                cancel
              </Button>
              <div onClick={() => setHide(true)}>
                <Button
                  onClick={() => {
                    {
                      editMode?updateComment(editId, updateCommentText):createComment(commentText);
                    }
                    setUpdateCommentText("")
                    setCommentText("");
                  }}
                >
                  {editMode ? "update" : "comment"}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-4 border-white" />

        {comment?.docs?.map((item) => {
          // console.log(item)
          return (
            <div key={item?._id}>
              <div className="flex gap-x-4">
                <div className="h-10 w-10 shrink-0">
                  <img src={item?.owner?.avatar} alt="" />
                </div>
                <div className="flex justify-between items-center w-full">
                  <div className="block">
                    <p className="text-green-200">{item?.owner?.fullname}</p>
                    <span className="text-sm text-green-200 bg-transparent">
                      {item?.content}
                    </span>
                  </div>
                  <div className="text-white">
                    <div className="mt-2 ">
                      <div onClick={handleClick}>
                        <MoreVertIcon />
                      </div>
                      <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                          "aria-labelledby": "demo-customized-button",
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleClose} disableRipple>
                          <div onClick={() => handleEdit(item?._id)}>
                            <EditIcon />
                            Edit
                          </div>
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                          <div onClick={() => deleteComment(item?._id)}>
                            <DeleteIcon />
                            Delete
                          </div>
                        </MenuItem>
                      </StyledMenu>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-4 border-white" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CommentSection;
