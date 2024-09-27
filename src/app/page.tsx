import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export const dynamic = "force-dynamic"
import { db } from "~/server/db";
import SpotifyProfile from "./_components/SpotifyProfile";
import Genres from "./_components/Genres";
import HomeComponent from "./_components/HomeComponent";


export default async function HomePage() {

const user =  auth();







  return (
    <main className="flex overflow-hidden min-h-screen flex-col items-center justify-center text-white">
     <h1 className="text-4xl cursor-pointer">


<HomeComponent/>





      {/* <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
        <SpotifyProfile/>
        <Genres/>
        
      </SignedIn> */}
     </h1>

    

    </main>
  );
}
