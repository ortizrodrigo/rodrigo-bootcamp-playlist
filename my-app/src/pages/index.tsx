import Link from "next/link";
import { Geist, Geist_Mono } from 'next/font/google';

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
    <Link href="/playlists" className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-md transition-colors">
      Go to playlists
    </Link>
  );
}