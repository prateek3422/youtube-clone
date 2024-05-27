import React, { useEffect, useState } from "react";
import videoService from "../services/VideoService";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import { useMutation,  } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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

const PlaylistCard = ({ userId }) => {


  const navigate  = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const playlist = await videoService.userplaylist(userId);
        setPlaylist(playlist.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const updatePlaylist = async (playlistId, Name, description) => {
    try {
      const playlist = await videoService.updatePlaylist(
        playlistId,
        Name,
        description
      );
      return playlist;
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate: update } = useMutation({
    mutationFn: updatePlaylist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["video"] });
    },
  });

  return (
    <>
      {playlist?.map((item) => {
        return item?.length == 0 ? (
          "playlist not available"
        ) : (
          <div className="video-card w-[80%]" key={item._id}>
            {item?.thumbnail ? (

              <div className="thumbnail">
                <img className="rounded-lg thumb-img" src="" alt="" />
              </div>
            ) : (
              <div className="thumbnail h-full w-full border-2 border-solid border-red-400  flex justify-center items-center flex-col"  onClick={() => navigate(`/Edit-Playlist`)}>
                <VideocamOffIcon className="rounded-lg thumb-img" />
                <p>0 video found</p>
                <p>Add videos</p>
           
              </div>
            )}
            <div className="flex">
              <div className="w-full">
                <h3 className="mb-1 font-semibold"></h3>
                <p className="flex text-xl text-gray-600">{item?.name}</p>
                <p className="text-sm text-gray-600">{item?.description}</p>
              </div>

              <div className="mt-2">
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
                    <EditIcon />
                    Edit
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    <DeleteIcon />
                    Delete
                  </MenuItem>
                </StyledMenu>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PlaylistCard;
