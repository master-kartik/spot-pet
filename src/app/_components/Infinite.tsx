"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { title } from "process";


export function Infinite({direction}:any) {
  return (
    <div className="h-[40rem] flex flex-col antialiased items-center justify-center relative overflow-hidden">
      <div className="text-secondary w-[50%] text-5xl font-bold italic mb-10 tracking-tighter leading-6 text-center"><span className="text-6xl font-serif text-primary">"</span>Find Your Furry Muse: Pets That Jam with Your Vibe!</div>
      <InfiniteMovingCards
        items={testimonials}
        direction={direction}
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {quote:"",
    title:"",
    name:"https://i.pinimg.com/564x/d1/e8/db/d1e8dba6158cb5bfe87a837c81d5e28d.jpg"
  },
  {
   
    name: "https://i.pinimg.com/564x/25/86/bd/2586bd1949a62095521be61b53116455.jpg",

  },
  {
    name: "https://i.pinimg.com/564x/cd/ed/28/cded2860541a3028c77cf3ca0a0f6901.jpg",
  },
  {

    name: "https://i.pinimg.com/564x/b2/1f/62/b21f62546750aff2481806c505e30b92.jpg",

  },
  {
    name: "https://i.pinimg.com/564x/9c/5b/16/9c5b16bc4b355cc24ebf390ac13f8b39.jpg",

  },
  {
    name: "https://i.pinimg.com/564x/76/90/c8/7690c860fceb762a99a3cd230cc2c71c.jpg",

  },
];
