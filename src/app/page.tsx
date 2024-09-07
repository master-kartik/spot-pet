import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
export const dynamic = "force-dynamic"
import { db } from "~/server/db";
export default async function HomePage() {
  const users =await db.query.users.findMany()
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#000000] to-[#060714] text-white">
     <h1 className="text-4xl cursor-pointer">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
     </h1>

      {/* {([...users]).map((user, index)=>(
          <div key={index}>
            <div>Hello</div>
            {user.name}
          
          </div>
      ))} */}
    </main>
  );
}
