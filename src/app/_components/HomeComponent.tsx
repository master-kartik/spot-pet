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
    <div className='relative'>
      <img 
        src="/assets/bg.gif" 
        className='w-screen h-[50vh] md:h-screen overflow-hidden object-cover top-0' 
        alt="this is a dog playing" 
      />
      <div className="flex flex-col md:w-[60%] mx-auto absolute inset-0 items-center justify-center text-background">
        <h2 className="text-4xl mt-10 md:text-6xl text-center font-neueregrade tracking-tight  font-extrabold uppercase italic">Discover Your Perfect Pet Match Today!</h2>
        <p className="mt-2 text-sm mx-10  text-center leading-tight">
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
<div className='relative md:w-full top-96'>
</div>
<div className='scroll-item'>

<StickyScrollReveal/>
</div>
    <div className='md:w-full'><img className='md:w-full' src="/assets/pettospot.png" alt="" /></div>

    
    <Infinite  direction={"right"}/>
   
 
    </div>
  )
}

export default HomeComponent