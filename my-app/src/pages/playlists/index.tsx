import Link from "next/link";
import { useState, useEffect } from "react";
import Modal from "@/components/Modal";

interface Playlist {
  id: string;
  name: string;
  description: string;
  songs: number;
}

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Fetch playlists on mount
  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const response = await fetch("/api/playlists");
        if (!response.ok) throw new Error("Failed to fetch playlists");
        const data = await response.json();
        if (data.success) {
          setPlaylists(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch playlists");
        }
      } catch (error) {
        console.error("Error fetching playlists:", error);
        setError("Failed to load playlists");
      }
    }
    fetchPlaylists();
  }, []);

  const handleAddPlaylist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playlistName.trim()) {
      setError("Playlist name is required");
      return;
    }

    try {
      const response = await fetch("/api/playlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: playlistName,
          description: playlistDescription,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to create playlist");
      }

      const updatedResponse = await fetch("/api/playlists");
      if (!updatedResponse.ok) throw new Error("Failed to fetch playlists");
      const updatedData = await updatedResponse.json();
      if (updatedData.success) {
        setPlaylists(updatedData.data);
      }

      setPlaylistName("");
      setPlaylistDescription("");
      setIsModalOpen(false);
      setError(null);
    } catch (error: any) {
      console.error("Error creating playlist:", error);
      setError(error.message || "Failed to create playlist");
    }
  };

  return (
    <main className='flex flex-col p-6'>
      <h1 className='text-3xl font-bold mb-6'>Playlists</h1>
      {error && <p className='text-red-500 mb-4'>{error}</p>}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto justify-center'>
        {playlists.map((playlist) => (
          <Link
            href={`/playlists/${playlist.id}`}
            key={playlist.id}
            className='bg-gray-700 rounded-md overflow-hidden hover:bg-gray-600 transition transform hover:scale-105 w-full'
          >
            <div className='p-4'>
              <h3 className='font-bold text-lg truncate'>{playlist.name}</h3>
              <p className='text-gray-200'>{playlist.description}</p>
              <p className='text-gray-400'>{playlist.songs} songs</p>
            </div>
          </Link>
        ))}
        <button
          onClick={() => setIsModalOpen(true)}
          className='bg-green-500 hover:bg-green-600 text-white font-bold rounded-md overflow-hidden transition transform hover:scale-105 w-full flex items-center justify-center'
        >
          <div className='p-4 text-center'>
            <span className='text-lg font-bold'>Add Playlist</span>
          </div>
        </button>
      </div>

      {/* new playlist Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setPlaylistName("");
          setPlaylistDescription("");
          setError(null);
        }}
        title='Create New Playlist'
      >
        <form onSubmit={handleAddPlaylist} className='flex flex-col gap-4'>
          <input
            type='text'
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            placeholder='Enter playlist name'
            className='bg-gray-700 text-white p-2 rounded-md w-full'
          />
          <input
            type='text'
            value={playlistDescription}
            onChange={(e) => setPlaylistDescription(e.target.value)}
            placeholder='Enter playlist description'
            className='bg-gray-700 text-white p-2 rounded-md w-full'
          />
          {error && <p className='text-red-500'>{error}</p>}
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-md'
          >
            Create
          </button>
        </form>
      </Modal>
    </main>
  );
}
