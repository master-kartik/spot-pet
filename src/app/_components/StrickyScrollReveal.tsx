"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: "Collaborative Editing",
    description:
      "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    content: (
      <img src="https://assets.lummi.ai/assets/QmaPtepurWDdb3QbcCnx5iw2Fo7sA8d2HFGGPvXvWt4dTw?auto=format&w=1500" className="min-w-full object-cover h-full" alt="" />
    ),
  },
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: (
      <img src="https://assets.lummi.ai/assets/QmXuBat4ZHghFLomPgvvLfuqnEAp3nArsnQAYQ1NuKoiLi?auto=format&w=1500" className="min-w-full object-cover h-full" alt="" />
    ),
  },
  {
    title: "Version control",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <img src="https://assets.lummi.ai/assets/QmYF32g9bwnxGhgXAKZvRRDEdGcmVkxLbcAqyKSUpqMNY9?auto=format&w=1500" className="min-w-full object-cover h-full" alt="" />

    ),
  },
  {
    title: "Running out of content",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
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
