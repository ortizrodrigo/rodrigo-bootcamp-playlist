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
    <div className="flex flex-col min-h-screen bg-gray-800 text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-gray-800 bg-gray-900">
        <div className="text-2xl font-bold text-green-500">
          Bootcamp Playlist
        </div>

        {/* TODO: change divs to links once Home and Playlists pages are set up */}
        <nav className="flex space-x-6">
          <div className="hover:text-green-400 transition-colors">
            Home
          </div>
          <div className="hover:text-green-400 transition-colors">
            Playlists
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-grow items-center justify-center">
        <div className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-md transition-colors">
          Go to playlists
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 border-t border-gray-800 text-center text-gray-400 bg-gray-900">
        Web Development at Berkeley
      </footer>
    </div>
    //<h1 className="text-4xl font-bold">Hello World</h1>
  );
}


/*
<div className="flex flex-col min-h-screen bg-gray-800 text-white">
  flex:               flexbox layout system (horizontal stacking by default)
  flex-col:           order container children vertically/in columns (default is horizontally/in rows)
  min-h-screen:       minimum height of the container is the height of the screen >>> full-screen
  bg-gray-800:        background color (100-900???)
  text-white:         white text :D
*/

/*
<header className="flex justify-between items-center p-4 border-b border-gray-800 bg-gray-900">
  flex:               flexbox layout system
  justify-between:    distributes items with maximum space between them (~ justify text-aligment)
  items-center:       vertically center items within header container
  p-4:                padding (left, right, top, bottom) of value 4 in Tailwind's spacing scale
  border-b:           adds a bottom border
  border-gray-800:    sets border color to gray
  bg-gray-900:        background color (100-900???)

Note: I am not sure why this component spawned a "dev tool" button on the bottom left corner of the website
*/

/*
<div className="text-2xl font-bold text-green-500">
  text-2xl:           set predefined font size to 2xl (Tailwind font sizes)
  font-bold:          bold font weight
  text-green-500:     set text color to green
*/

/*
<nav className="flex space-x-6">
  nav:                defines a navigation section (implemented later)
  flex:               flexbox layout system (horizontal stacking by default)
  space-x-6:          horizontal spacing between nav container's child elements
*/

/*
<div className="hover:text-green-400 transition-colors">
  hover:text-green-400:     changes div's text to green when hovered over.
  transition-colors:        smoothens hover color change
*/

/*
<footer className="p-4 border-t border-gray-800 text-center text-gray-400 bg-gray-900">
  p-4:                padding (left, right, top, bottom) of value 4 in Tailwind's spacing scale
  border-t:           adds a top border
  border-gray-800:    sets border color to gray
  text-center:        center text
  text-gray-400:      color text
  bg-gray-900:        color background

  Note: did not use flex as it only contains one element, thus vertical stacking works fine here
*/

/*
<main className="flex flex-grow items-center justify-center">
  flex:               turns the <main> container into a flex container
  flex-grow:          makes the <main> container grow and fill remaining space in its flex container
  items-center:       vertically center items within main container
  justify-center:     horizontally center items within main container
*/

/*
<div className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md transition-colors">
  bg-green-500:         adds a green background
  hover:bg-green-600:   darkens green background when hovered over 
  text-white:           color text
  font-bold:            bold font weight
  px-6:                 horizontal padding of value 6 in Tailwind's spacing scale
  py-3:                 vertical padding of value 3 in Tailwind's spacing scale
  rounded-md:           "rounded medium border": rounds corners
  transition-colors:    smoothens hover color change
*/