import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export const dynamic = "force-dynamic"
import { db } from "~/server/db";
import SpotifyProfile from "./_components/SpotifyProfile";
import Genres from "./_components/Genres";

export default async function HomePage() {

const user =  auth();







  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#000000] to-[#060714] text-white">
     <h1 className="text-4xl cursor-pointer">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
        <SpotifyProfile/>
        <Genres/>
        
      </SignedIn>
     </h1>

    

    </main>
  );
}
