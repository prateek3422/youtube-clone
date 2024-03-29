import React, { useEffect, useState } from "react";
import auth from "../services/auth";
import VideoService from "../services/VideoService";

const History = () => {
  const [history, setHistory] = useState([]);
  // console.log(history);
  useEffect(() => {
    (async () => {
      try {
        const his = await auth.getWatchHistory();
        // console.log(his.data)
        setHistory(his.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <div className="main  w-full">
          <div className="flex flex-col items-start">
            {history.map((item) => {
              console.log(item);
              return (
                <li className="list-none" key={item._id}>
                  <div className="flex items-start gap-x-4">
                    <div className="img mb-4 mt-2 w-3/12 ">
                      <img
                        className="w-full rounded-xl"
                        src={item.thumbnail}
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
