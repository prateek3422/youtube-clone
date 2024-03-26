import React, { useState } from "react";
import SideBar from "../sideBar";


const Logo = () => {
  const [slider, setSlider] = useState(false);


  return (
    <>
      <div className=" flex flex-wrap items-center justify-between mx-auto  " >
        <img src="/images/logo.png" alt="logo" />
      </div>

   
    </>
  );
};

export default Logo;
