"use client";
import { RedirectToSignUp, SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import axios from "axios";
import { ShareSocial } from 'react-share-social';
import { useState, useEffect, useRef } from "react";
import getPhotosByQuery from "../api/fetchImage/route";
import { MultiStepLoaderDemo } from "../_components/MultiStepLoader";
import html2canvas from 'html2canvas';
import { permanentRedirect } from "next/navigation";

interface PetNames {
  breed: string;
  pet: string;
  reasoning: string;
}

const Genres = () => {
  const { isSignedIn } = useAuth();
  const [genres, setGenres] = useState<string[]>([]);
  const [petNames, setPetNames] = useState<PetNames | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  

  const petRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    const fetchClientGenres = async () => {
      if (!isSignedIn) return;
      setLoading(true);
      try {
        const response = await fetch("/api/spotify/genres");
        const data = await response.json();

        if (response.ok) {
          setGenres(data);
          await suggestPetName(data);
        } else {
          setError(data.message || "Failed to fetch Spotify profile");
        }
      } catch (err) {
        setError("An error occurred while fetching Spotify profile");
      } finally {
        setLoading(false); 
      }
    };

    fetchClientGenres();
  }, [isSignedIn]);

  const suggestPetName = async (genres: string[]) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/suggestPet', { genres }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ACCESS_TOKEN'
        }
      });

      const candidates = response.data.candidates[0].content.parts[0].text;
      const parsedPetNames: PetNames = JSON.parse(candidates);

      if (parsedPetNames.pet) {
        const photoData = await getPhotosByQuery({ query: parsedPetNames.pet });
        setPhotos(photoData.results); 
      }
      setPetNames(parsedPetNames);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); 
    }
  }


  // Function to handle sharing
  const handleShare = async () => {
    if (petRef.current) {
      // Ensure all images are loaded before capturing
      const imagesLoaded = Array.from(petRef.current.getElementsByTagName('img')).every(img => img.complete);

      if (!imagesLoaded) {
        alert("Please wait for all images to load before sharing.");
        return;
      }

      try {
        const canvas = await html2canvas(petRef.current, { 
          allowTaint: true,
          useCORS: true,
          scale: 5,
         });

        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], "pet.png", { type: "image/png" });
            

            
            if (navigator.share) {
              try {
                await navigator.clipboard.writeText(`hehe found my spirit animal using pettospot this is based on my music taste 👀, check yours? \n ${window.location.href}`);
                // alert('Hey we have copied somthing beautiful in your clipboard please paste that while sharing ')
                await navigator.share({
                  text: 'hehe found my spirit animal using pettospot this is based on my music taste 👀',
                  files: [file],
                });
              } catch (err) {
                console.error("Error sharing:", err);
              }
            } else {
              alert("Sharing not supported on this browser. Please copy and share manually.");
            }
          }
        });
      } catch (error) {
        console.error("Error capturing canvas:", error);
      }
    } else {
      console.error("Reference to pet details not found.");
    }
  };

  return (
    <>
    <SignedIn>
      <main className="min-h-screen mt-0 bg-[#f9f9f9] ">
      <div className="flex flex-col my-20 px-36 items-start justify-center" >
        {loading ? (
          <MultiStepLoaderDemo /> 
        ) : petNames ? (
          <>
          <div className="py-4 px-16" ref={petRef}>
            {photos.length > 0 && (
              <img 
                className="h-[60vh] object-cover w-[80vw]" 
                src={photos[0]?.urls.full} 
                alt={petNames.pet} 
                crossOrigin="anonymous" // Set crossOrigin attribute
              />
            )}
            <section className="flex flex-col space-y-4 my-20 w-[90%]">
              <h1 className="text-6xl mb-4 font-bold italic tracking-tighter text-black">
                {petNames?.pet}
              </h1>
              <div className="w-[30vw] h-[2px] mt-4 bg-black"></div>
              <p className="font-inter text-lg leading-6 tracking-tight">
                {petNames?.reasoning}
              </p>
            </section>
            </div>
            <div className="flex gap-5">
              <button 
                className="bg-secondary text-background py-3 px-6 hover:bg-secondary-focus transition duration-300"
                onClick={handleShare} 
              >
                Share
              </button>
              <button 
                className="bg-white text-secondary border-2 border-secondary py-3 px-6"
                onClick={() => suggestPetName(genres)} 
              >
                Regenerate
              </button>

            </div>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </main>
    </SignedIn>
    <SignedOut>
    {permanentRedirect(`/`)}
    </SignedOut>
    </>
  );
};

export default Genres;