'use client'
import React, { useEffect, useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { usePathname } from 'next/navigation';
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const [textCol, setTextCol] = useState('text-charcoal');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleScroll = () => {
    if (pathname === '/') {
      if (window.scrollY < 600) {
        setTextCol('text-softWhite');
      } else {
        setTextCol('text-charcoal');
      }
    }
  };

  useEffect(() => {

    if (pathname === '/') {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); 
    } else {
      setTextCol('text-charcoal'); 
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  const navList = (
    <div className={`md:flex w-auto md:bg-transparent mb-0 h-screen md:h-auto text-center justify-center md:text-left md:gap-5 items-center z-50 p-16 md:p-0`}>
      {["About Us", "Privacy", "Contact Us", "Sign In"].map((data, index) =>
        index === 3 ? (
          <div key={index} className="text-3xl hover:bg-dark md:hover:text-white hover:shadow-lg md:hover:bg-transparent md:shadow-none md:hover:shadow-none p-6 md:p-0 rounded-lg shadow-sm md:mb-0 md:font-semibold tracking-tight font-medium md:text-sm">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <div className="scale-90 -mb-1">
                <UserButton />
              </div>
            </SignedIn>
          </div>
        ) : (
          <div key={index}>
            <div
              onClick={() => {
                scrollToTop();
              }}
              className="text-3xl hover:bg-dark md:hover:text-white hover:shadow-lg md:hover:bg-transparent md:shadow-none md:hover:shadow-none p-6 md:p-0 rounded-lg shadow-sm md:mb-0 font-normal md:font-medium tracking-tight md:text-sm"
            >
              {data}
            </div>
          </div>
        )
      )}
    </div>
  );

  return (
    <div className={`flex ${textCol} font-neueregrade top-1 items-center left-1/2 transform -translate-x-1/2 justify-between bg-opacity-20 backdrop-blur-md fixed w-[96vw] lg:w-[40vw] mt-[0vw] rounded-lg bg-[#B3BFC4] z-50 py-4 px-8`}>
      <div className={`flex -gap-1 items-center text-lg select-none tracking-tight cursor-pointer font-bold z-10`}>
        <Link href={'/'}>PettoSpot.</Link>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="hidden md:block">{navList}</div>
      </div>

      {/* Mobile Menu (Optional) */}
      <div className="md:hidden absolute top-[60px] z-30 w-full w-screen-md mx-auto left-1/2 transform -translate-x-1/2 text-background bg-text bg-opacity-[99%] backdrop-blur-lg rounded-lg shadow-md">
        {/* Mobile nav list can be added here */}
      </div>
    </div>
  );
}