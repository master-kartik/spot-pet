import "~/styles/globals.css";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import localfont from 'next/font/local';
import { type Metadata } from "next";


import { Inter } from 'next/font/google';
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter', // Define a CSS variable for Tailwind
});
export const metadata: Metadata = {
  title: "Pettospot.",
  description: "Discover your perfect music pet match",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const neueregrade = localfont({
  src: [{path: '../../public/fonts/Neue-Regrade-Variable.ttf'}],
  display: 'swap',
  weight: '100 900',
  variable: '--font-neueregrade'
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>

      <html lang="en" className={`  ${neueregrade.variable} ${inter.variable} no-scrollbar` }>
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>

      <body className="font-inter tracking-tight bg-[#f9f9f9]">
        <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>
    </ClerkProvider>
  );
}


