import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import { usePlaylist } from "@/contexts/PlaylistContext";
import Modal from "@/components/Modal";

type SpotifyTrack = {
    id: string;
    title: string;
    artist: string;
    duration: string;
    image?: string;
};

export default function PlaylistDetail() {
    const router = useRouter();
    const { id } = router.query;
    const { playlists, songs, editPlaylist, addSong, deleteSong } = usePlaylist();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddTrackModalOpen, setIsAddTrackModalOpen] = useState(false);
    const [editedName, setEditedName] = useState("");
    const [editedDescription, setEditedDescription] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<SpotifyTrack[]>([]);

    const playlist = typeof id === "string" ? playlists.find((p) => p.id === id) : null;
    const playlistSongs = typeof id === "string" ? songs[id] || [] : [];

    useEffect(() => {
        if (playlist) {
            setEditedName(playlist.name);
            setEditedDescription(playlist.description);
        }
    }, [playlist]);

    const searchTracks = useCallback(async (query: string) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        try {
            const response = await fetch(`/api/spotify-search?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Search failed:', {
                    status: response.status,
                    statusText: response.statusText,
                    errorData,
                });
                throw new Error('Search failed');
            }

            const data = await response.json();
            setSearchResults(data.tracks || []);
        } catch (error) {
            console.error('Error searching tracks:', error);
            setSearchResults([]);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            searchTracks(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery, searchTracks]);

    const handleAddSpotifyTrack = (track: SpotifyTrack) => {
        addSong(id as string, {
            id: track.id,
            title: track.title,
            artist: track.artist,
            duration: track.duration,
        });
        setSearchQuery("");
        setSearchResults([]);
        setIsAddTrackModalOpen(false); // Close modal after adding
    };

    if (!id || typeof id !== "string") {
        return (
            <main className="flex-grow flex items-center justify-center">
                <p>Loading playlist...</p>
            </main>
        );
    }

    if (!playlist) {
        return (
            <main className="flex-grow flex items-center justify-center">
                <p>Playlist not found</p>
            </main>
        );
    }

    const handleEditPlaylist = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editedName.trim()) return;

        editPlaylist(id, {
            name: editedName,
            description: editedDescription,
        });
        setIsEditModalOpen(false);
    };

    const handleDeleteSong = (songId: string) => {
        deleteSong(id, songId);
    };

    return (
        <main className="flex-grow p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-5xl font-bold mt-2">{playlist.name}</h1>
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-md"
                    >
                        Edit Playlist
                    </button>
                    <button
                        onClick={() => setIsAddTrackModalOpen(true)}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-md"
                    >
                        Add Track
                    </button>
                </div>
            </div>
            <p className="text-gray-400 mb-4">{playlist.description}</p>

            {/* Playlist Songs */}
            <div className="bg-gray-900 rounded-md p-4">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-800 text-gray-400 text-left">
                            <th className="pb-2 w-12">#</th>
                            <th className="pb-2">TITLE</th>
                            <th className="pb-2">ARTIST</th>
                            <th className="pb-2 text-right">DURATION</th>
                            <th className="pb-2 text-right">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playlistSongs.map((song, index) => (
                            <tr key={song.id} className="hover:bg-gray-800 group">
                                <td className="py-3 text-gray-400">{index + 1}</td>
                                <td className="py-3 font-medium group-hover:text-green-400">{song.title}</td>
                                <td className="py-3 text-gray-400">{song.artist}</td>
                                <td className="py-3 text-gray-400 text-right">{song.duration}</td>
                                <td className="py-3 text-right">
                                    <button
                                        onClick={() => handleDeleteSong(song.id)}
                                        className="text-red-500 hover:text-red-600 font-bold"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Playlist Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Playlist"
            >
                <form onSubmit={handleEditPlaylist} className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        placeholder="Enter playlist name"
                        className="bg-gray-700 text-white p-2 rounded-md w-full"
                    />
                    <input
                        type="text"
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        placeholder="Enter playlist description"
                        className="bg-gray-700 text-white p-2 rounded-md w-full"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-md"
                    >
                        Save
                    </button>
                </form>
            </Modal>

            {/* Add Track Modal */}
            <Modal
                isOpen={isAddTrackModalOpen}
                onClose={() => {
                    setIsAddTrackModalOpen(false);
                    setSearchQuery(""); // Reset search when closing
                    setSearchResults([]);
                }}
                title="Add Spotify Track"
            >
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Spotify tracks..."
                        className="bg-gray-700 text-white p-2 rounded-md w-full"
                    />
                    {searchResults.length > 0 && (
                        <div className="bg-gray-900 rounded-md p-4 max-h-64 overflow-y-auto">
                            {searchResults.map((track) => (
                                <div
                                    key={track.id}
                                    className="flex items-center justify-between py-2 border-b border-gray-800 last:border-b-0"
                                >
                                    <div className="flex items-center gap-2">
                                        {track.image && (
                                            <img src={track.image} alt={track.title} className="w-10 h-10 rounded" />
                                        )}
                                        <div>
                                            <p className="font-medium">{track.title}</p>
                                            <p className="text-gray-400 text-sm">{track.artist}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleAddSpotifyTrack(track)}
                                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md"
                                    >
                                        +
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Modal>
        </main>
    );
}