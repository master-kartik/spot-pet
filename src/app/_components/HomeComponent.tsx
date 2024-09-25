import React from 'react'
import Navbar from './Navbar'
import Genres from './Genres'
import { StickyScrollReveal } from './StrickyScrollReveal'


const HomeComponent = () => {
  return (
    <div>
    <div className='relative '>
      <Navbar />
      <img 
        src="/assets/bg.gif" 
        className='w-screen h-screen overflow-hidden object-cover top-0' 
        alt="this is a dog playing" 
      />
      <div className="flex flex-col w-[70%] mx-auto absolute inset-0 items-center tracking-tight justify-center text-softWhite">
        <h2 className="text-6xl text-center font-neueregrade font-black italic">Discover Your Perfect Pet Match Today!</h2>
        <p className="mt-2 text-lg text-center leading-tight">
          Unleash the fun with our unique web app that pairs your Spotify music taste with the ideal pet and breed for you. Dive into a world of furry companions that resonate with your vibe!
        </p>
        <div className="flex font-medium mx-auto text-sm tracking-tight space-x-4 mt-4">
          <button className="bg-softWhite text-black py-3 px-6  hover:bg-gray-200 transition duration-300">
          Get Started
          </button>

          <button className="border border-softWhite text-softWhite bg-transparent backdrop-blur-md py-3 px-6   hover:bg-softWhite hover:text-black transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
<StickyScrollReveal/>
    <div className="bg-white">
    <div className='text-2xl text-coral'>Coral</div> <br />
    <div className='text-2xl text-sky'>Coral</div> <br />
    <div className='text-2xl text-olive'>Coral</div> <br />
    <div className='text-2xl text-charcoal'>Coral</div> <br />
    <div className='text-2xl text-softWhite'>Coral</div> <br />
    <div className='text-2xl text-deepTeal'>Coral</div> <br />
    </div>

    <Genres/>
      {/* <div className='tracking-tighter text-8xl bg-white text-black'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo nostrum incidunt maiores possimus ducimus corrupti quam pariatur. Laborum assumenda officia illo sapiente debitis expedita eius aperiam blanditiis! Beatae, corporis quas?</div> */}
    </div>
  )
}

export default HomeComponent