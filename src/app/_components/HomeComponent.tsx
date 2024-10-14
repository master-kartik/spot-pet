"use client"
import React from 'react'
import Navbar from './Navbar'

import { StickyScrollReveal } from './StrickyScrollReveal'
import { Infinite } from './Infinite'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { useAuth } from "@clerk/nextjs";
import Link from 'next/link'

const HomeComponent = () => {
  const { isSignedIn } = useAuth(); 
  return (
    <div className=''>
    <div className='relative scroll-container'>
      <img 
        src="/assets/bg.gif" 
        className='w-screen h-screen overflow-hidden object-cover top-0' 
        alt="this is a dog playing" 
      />
      <div className="flex flex-col w-[60%] mx-auto absolute inset-0 items-center justify-center text-background">
        <h2 className="text-6xl text-center font-neueregrade tracking-tight  font-extrabold uppercase italic">Discover Your Perfect Pet Match Today!</h2>
        <p className="mt-2 text-lg text-center leading-tight">
          Unleash the fun with our unique web app that pairs your Spotify music taste with the ideal pet and breed for you. Dive into a world of furry companions that resonate with your vibe!
        </p>
        <div className="flex font-medium mx-auto text-sm tracking-tight space-x-4 mt-4">
        
          <SignedOut>
        {!isSignedIn &&  
        <button className="bg-secondary text-background py-3 px-6  hover:bg-secondary-focus transition duration-300">
        <SignInButton/> 
        </button>}
      </SignedOut>
      <SignedIn>
        <Link href={'/genres'}>
      <button className="bg-secondary text-background py-3 px-6  hover:bg-secondary-focus transition duration-300">
        
        Get Started
        </button>
        </Link>
      </SignedIn>


          <button className="border border-background text-background bg-transparent backdrop-blur-md py-3 px-6    hover:text-background transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
<div className='relative w-full top-96'>
</div>
<div className='scroll-item'>

<StickyScrollReveal/>
</div>
    <div className='w-full'><img className='w-full' src="/assets/pettospot.png" alt="" /></div>

   <div className=''>
    
    <Infinite  direction={"right"}/>
   </div>
    
    <div className='bg-black'>

    {/* <Genres /> */}
    </div>
      {/* <div className='tracking-tighter text-8xl bg-white text-black'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo nostrum incidunt maiores possimus ducimus corrupti quam pariatur. Laborum assumenda officia illo sapiente debitis expedita eius aperiam blanditiis! Beatae, corporis quas?</div> */}
    </div>
  )
}

export default HomeComponent