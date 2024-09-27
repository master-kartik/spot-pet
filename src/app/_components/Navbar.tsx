'use client'
import React, { useEffect, useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import { Collapse, IconButton } from "@material-tailwind/react";

export default function Navbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const [openSearch, setOpenSearch] = React.useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <div
      className={` md:flex w-auto md:bg-transparent mb-0 h-screen md:h-auto text-center justify-center md:text-left  md:gap-5 items-center z-50 p-16 md:p-0 `}
    >
      {["About Us", "Privacy", "Contact Us", "Sign In"].map((data, index) =>
      index==3?(
        <div key={index} className="text-3xl hover:bg-dark md:hover:text-white hover:shadow-lg  md:hover:bg-transparent md:shadow-none md:hover:shadow-none p-6 md:p-0 rounded-lg shadow-sm md:mb-0 md:font-semibold tracking-tight font-medium md:text-sm">
          <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <div className="scale-90 -mb-1">
        <UserButton />
        </div>
      </SignedIn>
        </div>
      ):(
          <div key={index}>
            <div
              onClick={() => {
                scrollToTop();
                setOpenNav(!openNav);
              }}
              className=" text-3xl hover:bg-dark md:hover:text-white hover:shadow-lg  md:hover:bg-transparent md:shadow-none md:hover:shadow-none p-6 md:p-0 rounded-lg shadow-sm md:mb-0 font-normal md:font-medium tracking-tight md:text-sm"
            >
              {data}
            </div>
          </div>
        )
      )}
    </div>
  );
  const [textCol, setTextCol] = useState('text-softWhite');
  const handler = ()=>{
    window.scrollY > 600 ? setTextCol('text-charcoal'):setTextCol('text-softWhite');
    console.log(window.scrollY)
  }
  useEffect(() => {
    window.addEventListener('scroll',()=>handler())
    
  }, []);
  return (
    <div className={`flex ${textCol} top-1 items-center left-1/2 transform -translate-x-1/2 text-[#fefefed0] justify-between bg-opacity-20  backdrop-blur-md  fixed w-[96vw] lg:w-[40vw] mt-[0vw] rounded-lg  bg-[#B3BFC4] z-50 py-4 px-8`}>
      <div
        className={`flex -gap-1 items-center text-lg select-none tracking-tight cursor-pointer font-bold z-10`}
      >
        PettoSpot
        
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="hidden md:block">{navList}</div>
        {/* <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent md:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton> */}
      </div>

      <div className="md:hidden absolute top-[60px] z-30 w-full w-screen-md mx-auto  left-1/2  transform -translate-x-1/2 text-background bg-text  bg-opacity-[99%] backdrop-blur-lg  rounded-lg  shadow-md">
        {/* <Collapse className="" open={openNav}>
          {navList}
        </Collapse> */}
      </div>
    </div>
  );
}
