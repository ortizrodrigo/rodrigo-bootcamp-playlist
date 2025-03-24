import Link from "next/link";
import { PlaylistProvider } from "../contexts/PlaylistContext";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <PlaylistProvider>
            <div className="flex flex-col min-h-screen bg-gray-800 text-white">
            {/* Header */}
            <header className="flex justify-between items-center p-4 border-b border-gray-800 bg-gray-900">
                <div className="text-2xl font-bold text-green-500">
                    Bootcamp Playlist
                </div>
                <nav className="flex space-x-6">
                    <Link href="/" className="hover:text-green-400 transition-colors">
                        Home
                    </Link>
                    <Link href="/playlists" className="hover:text-green-400 transition-colors">
                        Playlists
                    </Link>
                </nav>
            </header>

            {/* Main Content */}
            {/* flex-grow ensures that remaining space between header and footer is taken */}
            <main className="flex-grow flex items-center justify-center">{children}</main>

            {/* Footer */}
            <footer className="p-4 border-t border-gray-800 text-center text-gray-400 bg-gray-900">
                Web Development at Berkeley
            </footer>
            </div>
        </PlaylistProvider>
    );
}