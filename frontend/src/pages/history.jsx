import React, { useEffect, useState } from "react";
import auth from "../services/auth";
import VideoService from "../services/VideoService";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../components";

const History = () => {
  const fetchedHistory = async () => {
    try {
      const history = await auth.getWatchHistory();
      return history.data;
    } catch (error) {
      console.log(error);
    }
  }

  const {isLoading ,data:history} = useQuery({ queryKey: ["history"], queryFn: fetchedHistory });

  
  return isLoading ? <Loader /> : (
    <>
      <div className="container mx-auto">
        <div className="main  w-full">
          <div className="flex flex-col items-start">
            {history.map((item) => {
              return (
                <li className="list-none" key={item._id}>
                  <div className="flex items-start gap-x-4">
                    <div className="img mb-4 mt-2 w-3/12 ">
                      <img
                        className="w-full rounded-xl object-cover"
                        src={item.thumbnail.url}
                        alt=""
                      />
                    </div>
                    <div className="details">
                      <h3>{item.title}</h3>
                      <p className="flex text-sm text-gray-600 mt-2">
                        {item?.owner?.userName}
                        <span className="ml-2">{item.views}· 44min</span>
                      </p>

                      <div className="h-10 w-72 mt-4 overflow-hidden group-focus:h-auto">
                        <p className="text-sm text-white">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
