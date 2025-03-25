import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { usePlaylist } from "@/contexts/PlaylistContext";
import Modal from "@/components/Modal";

export default function PlaylistDetail() {
    const router = useRouter();
    const { id } = router.query;
    const { playlists, songs, editPlaylist, addSong, deleteSong } = usePlaylist();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddSongModalOpen, setIsAddSongModalOpen] = useState(false);
    const [editedName, setEditedName] = useState("");
    const [editedDescription, setEditedDescription] = useState("");
    const [newSongTitle, setNewSongTitle] = useState("");
    const [newSongArtist, setNewSongArtist] = useState("");
    const [newSongDuration, setNewSongDuration] = useState("");

    const playlist = typeof id === "string" ? playlists.find((p) => p.id === id) : null;
    const playlistSongs = typeof id === "string" ? songs[id] || [] : [];

    useEffect(() => {
        if (playlist) {
            setEditedName(playlist.name);
            setEditedDescription(playlist.description);
        }
    }, [playlist]);

    // all hooks are called before early return
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

    // handle form submission to update playlist
    const handleEditPlaylist = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editedName.trim()) return; // no empty names

        editPlaylist(id, {
            name: editedName,
            description: editedDescription,
        });
        setIsEditModalOpen(false); // close modal
    };

    // handle form submission to add a new song
    const handleAddSong = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSongTitle.trim() || !newSongArtist.trim() || !newSongDuration.trim()) return; // all fields non-empty

        const newSong = {
            id: Date.now().toString(), // unique ID
            title: newSongTitle,
            artist: newSongArtist,
            duration: newSongDuration,
        };

        addSong(id, newSong);
        setNewSongTitle(""); // reset form
        setNewSongArtist("");
        setNewSongDuration("");
        setIsAddSongModalOpen(false); // close modal
    };

    // handle deleting a song
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
                        onClick={() => setIsAddSongModalOpen(true)}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-md"
                    >
                        Add Song
                    </button>
                </div>
            </div>
            <p className="text-gray-400 mb-4">{playlist.description}</p>

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

            {/* edit playlist Modal */}
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

            {/* add song modal */}
            <Modal
                isOpen={isAddSongModalOpen}
                onClose={() => setIsAddSongModalOpen(false)}
                title="Add New Song"
            >
                <form onSubmit={handleAddSong} className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={newSongTitle}
                        onChange={(e) => setNewSongTitle(e.target.value)}
                        placeholder="Enter song title"
                        className="bg-gray-700 text-white p-2 rounded-md w-full"
                    />
                    <input
                        type="text"
                        value={newSongArtist}
                        onChange={(e) => setNewSongArtist(e.target.value)}
                        placeholder="Enter artist name"
                        className="bg-gray-700 text-white p-2 rounded-md w-full"
                    />
                    <input
                        type="text"
                        value={newSongDuration}
                        onChange={(e) => setNewSongDuration(e.target.value)}
                        placeholder="Enter duration (e.g., 3:45)"
                        className="bg-gray-700 text-white p-2 rounded-md w-full"
                    />
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-md"
                    >
                        Add
                    </button>
                </form>
            </Modal>
        </main>
    );
}