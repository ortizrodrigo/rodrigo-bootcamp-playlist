import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Playlist {
    id: string;
    name: string;
    description: string;
    songs: number;
}

interface Song {
    id: string;
    title: string;
    artist: string;
    duration: string;
}

export type SpotifyTrack = {
    id: string;
    title: string;
    artist: string;
    duration: string;
    image?: string;
};

interface PlaylistContextType {
    playlists: Playlist[];
    songs: { [key: string]: Song[] };
    addPlaylist: (newPlaylist: Playlist, newSongs: Song[]) => void;
    editPlaylist: (id: string, updatedPlaylist: Partial<Playlist>) => void;
    addSong: (playlistId: string, newSong: Song) => void;
    deleteSong: (playlistId: string, songId: string) => void;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export function PlaylistProvider({ children }: { children: ReactNode }) {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [songs, setSongs] = useState<{ [key: string]: Song[] }>({});

    // fetch playlist data from the API on component mount
    useEffect(() => {
        async function fetchPlaylists() {
            try {
                const response = await fetch("/api/playlists");
                if (!response.ok) throw new Error("Failed to fetch playlists");
                const data = await response.json();
                setPlaylists(data.playlists);
                setSongs(data.songs);
            } catch (error) {
                console.error("Error fetching playlists:", error);
            }
        }
        fetchPlaylists();
    }, []);

    const addPlaylist = (newPlaylist: Playlist, newSongs: Song[]) => {
        setPlaylists((prev) => [...prev, newPlaylist]);
        setSongs((prev) => ({ ...prev, [newPlaylist.id]: newSongs }));
    };

    const editPlaylist = (id: string, updatedPlaylist: Partial<Playlist>) => {
        setPlaylists((prev) =>
            prev.map((playlist) => playlist.id === id ? { ...playlist, ...updatedPlaylist } : playlist)
        );
    };

    const addSong = (playlistId: string, newSong: Song) => {
        setSongs((prev) => ({
            ...prev,
            [playlistId]: [...(prev[playlistId] || []), newSong],
        }));
        
        setPlaylists((prev) =>
            prev.map((playlist) =>
                playlist.id === playlistId
                    ? { ...playlist, songs: (playlist.songs || 0) + 1 }
                    : playlist
            )
        );
    };

    const deleteSong = (playlistId: string, songId: string) => {
        setSongs((prev) => ({
            ...prev,
            [playlistId]: (prev[playlistId] || []).filter((song) => song.id !== songId),
        }));
        
        setPlaylists((prev) =>
            prev.map((playlist) =>
                playlist.id === playlistId
                    ? { ...playlist, songs: Math.max((playlist.songs || 0) - 1, 0) }
                    : playlist
            )
        );
    };

    return (
        <PlaylistContext.Provider value={{ playlists, songs: songs, addPlaylist, editPlaylist, addSong, deleteSong }}>
            {children}
        </PlaylistContext.Provider>
    );
}

export function usePlaylist() {
    const context = useContext(PlaylistContext);
    if (!context) {
        throw new Error("usePlaylist must be used within a PlaylistProvider");
    }
    return context;
}