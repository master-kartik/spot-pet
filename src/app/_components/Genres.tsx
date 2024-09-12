"use client";

import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useState, useEffect } from "react";

const Genres = () => {
  const { isSignedIn } = useAuth();
  const [genres, setGenres] = useState<string[]>([]);
  const [petNames, setPetNames] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientGenres = async () => {
      if (!isSignedIn) return;

      try {
        const response = await fetch("/api/spotify/genres");
        const data = await response.json();

        if (response.ok) {
          console.log("Fetched genres:", data);
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
  
    try {
      const response = await axios.post('/api./suggestPet', {
        genres: genres,
      }
    );

      if (response.status === 200) {
        const suggestions = response.data; 
        setPetNames(suggestions);
      } else {
        setError("Failed to fetch pet name suggestions");
      }
    } catch (error) {
      console.error("Error fetching pet name suggestions:", error);
      setError("An error occurred while fetching pet name suggestions");
    }
  };

  return (
    <main>
      <div>Genres</div>
      {isSignedIn && genres.map((genre, index) => (
        <div key={index} className="text-lg">{genre}</div>
      ))}
      <div>Suggested Pet Names</div>
      {petNames.length > 0 ? (
        petNames.map((name, index) => (
          <div key={index} className="text-lg">{name}</div>
        ))
      ) : (
        <div>No pet names suggested yet.</div>
      )}
      {error && <div className="text-red-500">{error}</div>}
    </main>
  );
};

export default Genres;