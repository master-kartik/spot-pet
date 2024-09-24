"use client";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchClientGenres = async () => {
      if (!isSignedIn) return;

      try {
        const response = await fetch("/api/spotify/genres");
        const data = await response.json();

        if (response.ok) {
          // console.log("Fetched genres:", data);
          setGenres(data);
          await suggestPetName(data);
          
        } else {
          setError(data.message || "Failed to fetch Spotify profile");
        }
      } catch (err) {
        setError("An error occurred while fetching Spotify profile");
      }
    };

    fetchClientGenres();
   
  }, [isSignedIn]);

  const suggestPetName = async (genres: string[]) => {
  
    await axios.post('/api/suggestPet',{
      genres: genres
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ACCESS_TOKEN'
      }
    })
    .then(response => {
      // console.log(response.data);
      setPetNames(response.data.candidates[0].content.parts[0].text)
      const candidates = response.data.candidates[0].content.parts[0].text;

      const parsedPetNames: PetNames = JSON.parse(candidates);
    // console.log("Parsed Pet Names:", parsedPetNames);
    setPetNames(parsedPetNames);
    })
    .catch(error => {
      console.error(error);
    });
  }
  return (
    <main>
      <div>Genres</div>
      {isSignedIn && genres && genres.join(",  ")}
      <div>Suggested Pet Names</div>
      {petNames ? (
      <div>
        <div><strong>Pet:</strong> {petNames.pet}</div>
        <div><strong>Breed:</strong> {petNames.breed}</div>
        <div><strong>Reasoning:</strong> {petNames.reasoning}</div>
      </div>
    ) : (
      <div>No pet names suggested yet.</div>
    )}
      {error && <div className="text-red-500">{error}</div>}
    </main>
  );

};

export default Genres;