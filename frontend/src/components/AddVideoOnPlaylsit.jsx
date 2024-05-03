import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Input from "./Input";
import { useForm } from "react-hook-form";

import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";

import Button from "./Button";
import videoService from "../services/VideoService";
import { useMutation } from "@tanstack/react-query";
const AddVideoOnPlaylsit = () => {
  const { register, handleSubmit } = useForm();
  const [value, setValue] = useState("details");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const createPlaylist = async (data) => {
    try {
      await videoService.createPlaylist(data);
    } catch (error) {
      console.log(error);
    }
  };



 return (
    <>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="details" label="Details" sx={{ color: "white" }} />
          <Tab value="video" label="Video" sx={{ color: "white" }} />
        </Tabs>
      </Box>

      <div className={value === "details" ? "block" : "hidden"}>
        <div className="w-4/6  mx-auto">
          <h1 className="text-2xl mb-4 font-semibold">Playlist Details</h1>
          <form onSubmit={handleSubmit(createPlaylist)}>
            <Input
              label="Title"
              type="text"
              placeholder="Enter your title"
              className="mb-8"
              {...register("title", {
                required: true,
              })}
            />

            <Textarea
              placeholder="Type in here…"
              // value={text}
              // onChange={(event) => setText(event.target.value)}
              minRows={7}
              maxRows={10}
              endDecorator={
                <Typography level="body-xs" sx={{ ml: "auto" }}>
                  500
                </Typography>
              }
              {...register("description", {
                required: true,
              })}
              sx={{ minWidth: 300 }}
            />
            <Button type="submit" className="mt-4">
              {" "}
              Save{" "}
            </Button>
          </form>
        </div>
      </div>

      <div className={value === "video" ? "block" : "hidden"}>
        
      </div>
    </>
  );
};

export default AddVideoOnPlaylsit;
