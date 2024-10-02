"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { title } from "process";


export function Infinite({direction}:any) {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
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
    name:"https://images.beta.cosmos.so/d991faaf-b853-443b-bd93-8a938301848d?format=jpeg"
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "https://images.beta.cosmos.so/68367142-b2b8-4691-8831-abb639051190?format=jpeg",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "https://images.beta.cosmos.so/bf6c4eb2-26a7-48fd-a751-efad56728530?format=jpeg",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "https://images.beta.cosmos.so/b5673b9b-bd39-4874-8933-bce4f1370919?format=jpeg",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "https://images.beta.cosmos.so/ba6b015e-07a2-45ed-a7f3-30b6ea75d118?format=jpeg",
    title: "Moby-Dick",
  },
];
