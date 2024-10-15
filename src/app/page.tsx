import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export const dynamic = "force-dynamic"
import { db } from "~/server/db";
import SpotifyProfile from "./_components/SpotifyProfile";

import HomeComponent from "./_components/HomeComponent";
import Footer from "./_components/Footer";


export default async function HomePage() {

const user =  auth();







  return (


<HomeComponent/>

  );
}
