"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: "Pet Playlist Match",
    description:
      "Your Spotify profile is more than just music; it's a gateway to finding your furry soulmate! Let us decode your tunes and suggest the perfect pet that fits your unique sound.",
    content: (
      <img src="https://assets.lummi.ai/assets/QmaPtepurWDdb3QbcCnx5iw2Fo7sA8d2HFGGPvXvWt4dTw?auto=format&w=1500" className="min-w-full object-cover h-full" alt="" />
    ),
  },
  {
    title: "Sonic Sidekicks",
    description:
      "Meet your new best friend—one that knows all the right notes! We analyze your Spotify habits to suggest pets that will vibe with your musical journey. Get ready for some tail-wagging fun!",
    content: (
      <img src="https://assets.lummi.ai/assets/QmXuBat4ZHghFLomPgvvLfuqnEAp3nArsnQAYQ1NuKoiLi?auto=format&w=1500" className="min-w-full object-cover h-full" alt="" />
    ),
  },
  {
    title: "Pawesome Picks",
    description:
      "Discover your perfect pet match based on your Spotify vibes! Whether you’re a rockstar or a classical connoisseur, we’ll suggest furry friends that groove to your playlist. Get ready to unleash some serious cuteness!",
    content: (
      <img src="https://assets.lummi.ai/assets/QmYF32g9bwnxGhgXAKZvRRDEdGcmVkxLbcAqyKSUpqMNY9?auto=format&w=1500" className="min-w-full object-cover h-full" alt="" />

    ),
  },
  {
    title: " Bark-tastic Beats",
    description:
      "From smooth jazz to high-energy pop, we’ve got the perfect pet waiting for you! Let’s discover which furry friend will dance through life by your side. Good vibes only! Our app connects the dots between your Spotify favorites and the perfect pet match, ensuring every day is filled with joy, laughter, and plenty of cuddles.",
    content: (
      <img src="https://assets.lummi.ai/assets/QmXuBat4ZHghFLomPgvvLfuqnEAp3nArsnQAYQ1NuKoiLi?auto=format&w=1500" className="min-w-full object-cover h-full" alt="" />

    ),
  },
];
export function StickyScrollReveal() {
  return (
    <div className="no-scrollbar">
      <StickyScroll content={content} />
    </div>
  );
}
