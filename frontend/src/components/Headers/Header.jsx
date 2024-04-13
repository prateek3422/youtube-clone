import React from "react";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogOut from "./LogOut";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";



const Header = ({ setSlide, slide }) => {
  const authStatus = useSelector((state) => state.auth.status);

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
      <div className="Head my-4 mx-1 w-full ">
        <nav className="flex justify-between items-center mx-4 ">
          <div className="grid grid-flow-col gap-4 w-16">
            <button onClick={setSlide} className="text-2xl text-white ">
       
              {/* {authStatus ? slide ? <RxCross2 /> : <GiHamburgerMenu /> : " "} */}
            </button>
            <div className="log0 w-12 ">
              <Logo />
            </div>
          </div>

          <ul className="Nav-btn  flex justify-between gap-4 items-center">
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
