import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { any } from "zod";

export async function GET() {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }
    try {
      const provider = "oauth_spotify"; 
      const clerkResponse = await clerkClient().users.getUserOauthAccessToken(
        userId,
        provider
      );

  const accessToken = clerkResponse.data[0]?.token; 

      if (!accessToken) {
        return NextResponse.json(
          { message: "Access token is undefined" },
          { status: 500 }
        );
      }
      const spotifyUrl = "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50&offset=0";
  
      
      const spotifyResponse = await fetch(spotifyUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",

        },
      
      });
  
      
    //   console.log("Spotify Response Status:", spotifyResponse.status);
  
      
      if (!spotifyResponse.ok) {
        const errorData = await spotifyResponse.json();
        console.error("Spotify API Error:", errorData);
        return NextResponse.json(
          { message: "Failed to fetch Spotify data", error: errorData },
          { status: spotifyResponse.status }
        );
      }
  
      const spotifyData = await spotifyResponse.json();
      const topArtists = spotifyData.items;
    // console.log(topArtists,"these ar your top artists")
    const clientGenres = Array.from(
      new Set(topArtists.flatMap((artist: any) => artist.genres))
  );
    // console.log(arr);

      
   
  
      
      return NextResponse.json(clientGenres);
    } catch (error:any) {
      
      console.error("Error fetching Spotify data:", error);
      return NextResponse.json(
        { message: "Internal Server Error", error: error.message },
        { status: 500 }
      );
    }
  }