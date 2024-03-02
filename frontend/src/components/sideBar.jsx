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
      icon: <IoMdHome />,
      slug: "/",
      active: authStatus,
    },

    {
      name: "Liked videos",
      icon: <AiFillLike />,
      slug: "/liked-videos",
      active: authStatus,
    },
    {
      name: "History",
      icon: <FaHistory />,
      slug: "/history",
      active: authStatus,
    },

    {
      name: "Collection",
      icon: <BsCollectionPlay />,
      slug: "/collection",
      active: authStatus,
    },

    {
      name: "MyContent",
      icon: <FaVideo />,
      slug: "/content",
      active: authStatus,
    },
    {
      name: "Subscribers",
      icon: <FaUserCheck />,
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
                className="flex  items-center justify-start border-2 w-full h-10 "
                onClick={() => navigate(item.slug)}
              >
                <span className="inline-block w-5 ">{item.icon}</span>
                <span className="block ">{item.name}</span>
              </button>
            </li>
          ) : null
        )}
      </ul>
    </>
  );
};

export default SideBar;
