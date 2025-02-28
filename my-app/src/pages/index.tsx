import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Header */}


      {/* Main Stuff */}
      <h1 className="text-4xl font-bold">Hello World :D</h1>
      

      {/* Footer */}
    </div>
    //<h1 className="text-4xl font-bold">Hello World</h1>
  );
}


/*
<div className="flex flex-col min-h-screen bg-gray-900 text-white">
  flex:           Flexbox layout system
  flex-col:       order container children vertically/in columns (default is horizontally/in rows)
  min-h-screen:   minimum height of the container is the height of the screen >>> full-screen
  bg-gray-900:    background color (100-900???)
  text-white:     white text :D

*/