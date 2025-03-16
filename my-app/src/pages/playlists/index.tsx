import Link from "next/link";
import { useState } from "react";

// Sample playlist data
const SAMPLE_PLAYLISTS = [
  { id: "1", name: "Retreat Playlist", tracks: 5},
  { id: "2", name: "Party Playlist", tracks: 1},
];

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState(SAMPLE_PLAYLISTS);

  return (
    <main className="flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Playlists</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto justify-center">
        {playlists.map((playlist) => (
          <Link
            href={`/playlists/${playlist.id}`}
            key={playlist.id}
            
            className="bg-gray-700 rounded-md overflow-hidden hover:bg-gray-600 transition transform hover:scale-105 w-full">
            <div className="p-4">
              <h3 className="font-bold text-lg truncate">{playlist.name}</h3>
              <p className="text-gray-400">{playlist.tracks} tracks</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}