import React, { useState } from "react";
import videoService from "../services/VideoService";
import Slider from "./Slider";
import Swal from "sweetalert2";
import { CiMenuKebab } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Button from "./Button";
import { MdEdit } from "react-icons/md";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../utils/query-client.js";

const UserVideoDetails = ({ item }) => {
  // console.log(item)
  const [publish, SetPublish] = useState(item?.isPublished);

  const handlePublish = async () => {
    try {
      const res = await videoService.toggleVideo(item?._id);
      SetPublish(res.data?.isPublished);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    try {
      const res = videoService.deleteVideo(item?._id);
      console.log(res);
      return res
    } catch (error) {
      console.log(error);
    }
  };


  const { mutate: video } = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["video"] });
    },
  });


  // Swal.fire({
  //   title: "Are you sure?",
  //   text: "You won't be able to revert this!",
  //   icon: "warning",
  //   showCancelButton: true,
  //   confirmButtonColor: "#3085d6",
  //   cancelButtonColor: "#d33",
  //   confirmButtonText: "Yes, delete it!",
  // }).then((result) => {
  //   if (result.isConfirmed) {
  //     Swal.fire({
  //       title: "Deleted!",
  //       text: "Your file has been deleted.",
  //       icon: "success",
  //     });
  //   }
  // });

  return (
    <div className="grid grid-cols-4 justify-between items-center border-2 h-12 rounded-lg mt-4 ml-4 mr-20 gap-1 ">
      <div className="flex justify-center  items-center">
        <Slider
          defaultChecked={publish ? true : false}
          onClick={handlePublish}
        />
        <div className="text-white">
          {publish ? "unpublished" : "published"}
        </div>
      </div>
      <div className="  flex justify-center items-center text-white ">
        {item.title}
      </div>
      <div className=" flex justify-center items-center text-white">
        {item.likes.length}
      </div>
      <div className="flex justify-around items-center text-white">
        {`${item.createdAt.day}/${item.createdAt.month}/${item.createdAt.year}`}
        <div className="">
        <button  className="mr-2"><MdEdit /></button>
        <button onClick={video}><MdDelete /></button>
      </div>
      </div>


    </div>
  );
};

export default UserVideoDetails;
