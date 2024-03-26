import React, { useState } from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogOut from "./LogOut";
import SideBar from "../sideBar";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  // console.log(authStatus);
  const [slide, setSlide] = useState(false);

  const navigate = useNavigate();

  const navItem = [
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
  ];
  return (
    <>
      <div className="Head my-px">
        <nav className="flex justify-between items-center mx-4 ">
          <div className="grid grid-flow-col gap-4 w-16">
            <button
              onClick={() => setSlide(!slide)}
              className="text-2xl text-white "
            >
              
               
                {authStatus ? slide ? <RxCross2 /> : <GiHamburgerMenu /> : " "}
              
            </button>
            <div className="log0 w-12 ">
              <Logo />
            </div>
          </div>

      {slide && (
            
            <div className={`  w-40 absolute  top-16 dark:bg-gray-900 animate-slide-in`}>
              <div className="w-full">
                <div className="group inset-l-0 z-40n w-full p-2">
                  <div><SideBar/></div>
                </div>
              </div>
            </div>
          )}
          <ul className="Nav-btn flex justify-between gap-4 items-center">
            {navItem.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className="px-4 py-2 rounded-lg bg-red-500 text-white"
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <button className="px-4 py-2 rounded-lg bg-red-500 text-white">
                  <LogOut />
                </button>
              </li>
            )}
          </ul>
  
        </nav>
      </div>
    </>
  );
};

export default Header;
