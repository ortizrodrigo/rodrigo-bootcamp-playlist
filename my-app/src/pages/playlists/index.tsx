import Link from "next/link";
import { useState } from "react";
import { usePlaylist } from "@/contexts/PlaylistContext";
import Modal from "@/components/Modal";

export default function PlaylistsPage() {
    const { playlists, addPlaylist } = usePlaylist();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [playlistName, setPlaylistName] = useState("");
    const [playlistDescription, setPlaylistDescription] = useState("");

    const handleAddPlaylist = (e: React.FormEvent) => {
        e.preventDefault();
        if (!playlistName.trim()) return; // no empty names

        const newPlaylist = {
            id: Date.now().toString(), // unique ID using timestamp
            name: playlistName,
            description: playlistDescription,
            songs: 0, // empty
        };
        addPlaylist(newPlaylist, []); // add empty song array
        setPlaylistName(""); // reset input
        setPlaylistDescription(""); // reset description
        setIsModalOpen(false); // close modal
    };

    return (
        <main className="flex flex-col">
            <h1 className="text-3xl font-bold mb-6">Playlists</h1>
        
            {/* playlist grid + add playlist button */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto justify-center">
                {playlists.map((playlist) => (
                <Link
                    href={`/playlists/${playlist.id}`}
                    key={playlist.id}
                    className="bg-gray-700 rounded-md overflow-hidden hover:bg-gray-600 transition transform hover:scale-105 w-full"
                >
                    <div className="p-4">
                        <h3 className="font-bold text-lg truncate">{playlist.name}</h3>
                        <p className="text-gray-200">{playlist.description}</p>
                        <p className="text-gray-400">{playlist.songs} songs</p>
                    </div>
                </Link>
                ))}
                {/* add playlist button as grid item */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-md overflow-hidden transition transform hover:scale-105 w-full flex items-center justify-center"
                >
                    <div className="p-4 text-center">
                        <span className="text-lg font-bold">Add Playlist</span>
                    </div>
                </button>
            </div>
        
            {/* Modal for creating a new playlist */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create New Playlist"
            >
                <form onSubmit={handleAddPlaylist} className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                        placeholder="Enter playlist name"
                        className="bg-gray-700 text-white p-2 rounded-md w-full"
                    />
                    <input
                        type="text"
                        value={playlistDescription}
                        onChange={(e) => setPlaylistDescription(e.target.value)}
                        placeholder="Enter playlist description"
                        className="bg-gray-700 text-white p-2 rounded-md w-full"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-md"
                    >
                        Create
                    </button>
                </form>
            </Modal>
        </main>
    );
}