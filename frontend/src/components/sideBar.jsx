import React from "react";
import { useSelector } from "react-redux";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import { BsCollectionPlay } from "react-icons/bs";
import { FaUserCheck } from "react-icons/fa";

const SideBar = () => {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const sideList = [
    {
      name: "Home",
      icon: <IoMdHome className="text-white"fontSize={"1.5rem"}  />,
      slug: "/",
      active: authStatus,
    },

    {
      name: "Liked videos",
      icon: <AiFillLike className="text-white" fontSize={"1.5rem"} />,
      slug: "/liked-videos",
      active: authStatus,
    },
    {
      name: "History",
      icon: <FaHistory className="text-white" fontSize={"1.5rem"} />,
      slug: "/history",
      active: authStatus,
    },

    // {
    //   name: "Collection",
    //   icon: <BsCollectionPlay className="text-white" />,
    //   slug: "/collection",
    //   active: authStatus,
    // },

    {
      name: "MyContent",
      icon: <FaVideo className="text-white"  fontSize={"1.5rem"}/>,
      slug: "/content",
      active: authStatus,
    },
    {
      name: "Subscribers",
      icon: <FaUserCheck className="text-white" fontSize={"1.5rem"}/>,
      slug: "/subscribers",
      active: authStatus,
    },
  ];

  return (
    <>
      <ul className="flex flex-col gap-y-2 items-center justify-center">
        {sideList.map((item) =>
          item.active ? (
            <li className="list-none w-full" key={item.name}>
              <button
                className="flex  items-center justify-start w-full h-10 p-2 gap-4 "
                onClick={() => navigate(item.slug)}
              >
              <div  >
              <span className="inline-block  w-5 ">{item.icon}</span>
              </div>
              <div>

                <span className="block text-white ">{item.name}</span>
              </div>
              </button>
            </li>
          ) : null
        )}
      </ul>
    </>
  );
};

export default SideBar;
