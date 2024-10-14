// "use client";
// import { useAuth } from "@clerk/nextjs";
// import axios from "axios";
// import { useState, useEffect, useRef } from "react";
// import getPhotosByQuery from "../api/fetchImage/route";
// import { MultiStepLoaderDemo } from "../_components/MultiStepLoader";
// import html2canvas from 'html2canvas';

// interface PetNames {
//   breed: string;
//   pet: string;
//   reasoning: string;
// }
// const Genres = () => {
//   const { isSignedIn } = useAuth();
//   const [genres, setGenres] = useState<string[]>([]);
//   const [petNames, setPetNames] = useState<PetNames | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [photos, setPhotos] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const petRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const fetchClientGenres = async () => {
//       if (!isSignedIn) return;
//       setLoading(true);
//       try {
//         const response = await fetch("/api/spotify/genres");
//         const data = await response.json();

//         if (response.ok) {
//           // console.log("Fetched genres:", data);
//           setGenres(data);
//           await suggestPetName(data);
          
//         } else {
//           setError(data.message || "Failed to fetch Spotify profile");
//         }
//       } catch (err) {
//         setError("An error occurred while fetching Spotify profile");
//       }
//       finally {
//         setLoading(false); 
//       }

//     };

//     fetchClientGenres();
   
//   }, [isSignedIn]);

//   const suggestPetName = async (genres: string[]) => {
//     setLoading(true);
//     await axios.post('/api/suggestPet',{
//       genres: genres
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ACCESS_TOKEN'
//       }
//     })
//     .then(async response => {
//       // console.log(response.data);
//       const candidates = response.data.candidates[0].content.parts[0].text;
//       // console.log(candidates)

//       const parsedPetNames: PetNames = JSON.parse(candidates);
//     // console.log("Parsed Pet Names:", parsedPetNames);
//     if (parsedPetNames.pet) {
//       const photoData = await getPhotosByQuery({ query: parsedPetNames.pet });
//       setPhotos(photoData.results); 
//       console.log(photos)
//     }
//     setPetNames(parsedPetNames);
   

//     })
//     .catch(error => {
//       console.error(error);
//     })
//     .finally(() => {
//       setLoading(false); 
//     });
//   }


//   const handleRegenerate = () => {
//     if (genres.length > 0) {
//       suggestPetName(genres); 
//     }
//   };

//   return (
//     <main  className="min-h-screen mt-0 bg-[#f9f9f9]">
//        <div className="flex flex-col my-20 px-36 items-start justify-center">
//        {loading ? (
//           <MultiStepLoaderDemo /> 
//         ) :
//        petNames ? (
//         <>
//         {photos.length >= 0 && (
//              <img className="h-[60vh] object-cover w-[80vw]" src={photos[0]?.urls.full} alt={petNames.pet} />
//            )}
         
//       <section className="flex flex-col space-y-4 my-20 w-[90%]">
//         <h1 className="text-6xl mb-4 font-bold italic tracking-tighter text-black">
//           {petNames?.pet}
//         </h1>
//         <div className="w-[30vw] h-[2px] bg-black"></div>
//         <p className="font-inter text-lg leading-6 tracking-tight">
//         {petNames?.reasoning}
//         </p>
//       </section>
//       <div className="flex gap-5">
//       <button onClick={handleShare} className="bg-secondary text-background py-3 px-6  hover:bg-secondary-focus transition duration-300">
//         Share
//         </button>
//         <button className="bg-white text-secondary border-2 border-secondary py-3 px-6  " onClick={handleRegenerate}>
//         Regenerate
//         </button>
//       </div>
//         </>)
//        :(<div></div>)}
//        </div>
//     </main>
//   );

// };

// export default Genres;


"use client";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import getPhotosByQuery from "../api/fetchImage/route";
import { MultiStepLoaderDemo } from "../_components/MultiStepLoader";
import html2canvas from 'html2canvas';

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
  
  // Create a ref for capturing the pet details
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
        setPhotos(photoData.results); // Set the fetched photos
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
        // Capture the screenshot with allowTaint option
        const canvas = await html2canvas(petRef.current, { 
          allowTaint: true,
          useCORS: true,
         });

        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], "pet.png", { type: "image/png" });

            // Check if Web Share API is supported
            if (navigator.share) {
              try {
                await navigator.share({
                  title: `Check out my pet name: ${petNames?.pet}`,
                  text: `I got a new pet name: ${petNames?.reasoning}`,
                  files: [file],
                  url: window.location.href,
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
    <main className="min-h-screen mt-0 bg-[#f9f9f9] ">
      <div className="flex flex-col my-20 px-36 items-start justify-center" >
        {loading ? (
          <MultiStepLoaderDemo /> 
        ) : petNames ? (
          <>
          <div className="py-4 px-8" ref={petRef}>
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
              <div className="w-[30vw] h-[2px] bg-black"></div>
              <p className="font-inter text-lg leading-6 tracking-tight">
                {petNames?.reasoning}
              </p>
            </section>
            </div>
            <div className="flex gap-5">
              <button 
                className="bg-secondary text-background py-3 px-6 hover:bg-secondary-focus transition duration-300"
                onClick={handleShare} // Attach share handler
              >
                Share
              </button>
              <button 
                className="bg-white text-secondary border-2 border-secondary py-3 px-6"
                onClick={() => suggestPetName(genres)} // Regenerate functionality
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
  );
};

export default Genres;