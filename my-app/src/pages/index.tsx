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
      <header className="flex justify-between items-center p-4 border-b border-gray-800">

      </header>

      {/* Main Stuff */}
      <h1 className="text-4xl font-bold">Hello World :D</h1>


      {/* Footer */}
    </div>
    //<h1 className="text-4xl font-bold">Hello World</h1>
  );
}


/*
<div className="flex flex-col min-h-screen bg-gray-900 text-white">
  flex:               flexbox layout system
  flex-col:           order container children vertically/in columns (default is horizontally/in rows)
  min-h-screen:       minimum height of the container is the height of the screen >>> full-screen
  bg-gray-900:        background color (100-900???)
  text-white:         white text :D
*/

/*
<header className="flex justify-between items-center p-4 border-b border-gray-800">
  flex:               flexbox layout system
  justify-between:    distributes items with maximum space between them (~ justify text-aligment)
  items-center:       vertically center items within header container
  p-4:                padding (left, right, top, bottom) of value 4 in Tailwind's spacing scale
  border-b:           adds a bottom border
  border-gray-800:    sets border color to gray

Note: I am not sure why this component spawned a "dev tool" button on the bottom left corner of the website
*/