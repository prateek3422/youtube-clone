import React from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogOut from "./LogOut";
const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  // console.log(authStatus);

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
        <nav className="flex justify-between items-center mx-4">
          <div className="log0 w-12 ">
            <Logo />
          </div>
          <SearchBar />

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
            {
            authStatus && (
              <li>
                     <button
                    className="px-4 py-2 rounded-lg bg-red-500 text-white"
                  >
                    <LogOut/>
                  </button>
              </li>
            )
            }
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
