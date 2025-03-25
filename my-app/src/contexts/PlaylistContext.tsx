import { createContext, useContext, useState, ReactNode } from "react";

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

interface PlaylistContextType {
    playlists: Playlist[];
    songs: { [key: string]: Song[] };
    addPlaylist: (newPlaylist: Playlist, newSongs: Song[]) => void;
    editPlaylist: (id: string, updatedPlaylist: Partial<Playlist>) => void;
    addSong: (playlistId: string, newSong: Song) => void;
    deleteSong: (playlistId: string, songId: string) => void;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

const SAMPLE_PLAYLISTS: Playlist[] = [
    { 
        id: "1", 
        name: "Retreat", 
        description: "for the car ride",
        songs: 3 
    },
    { 
        id: "2", 
        name: "Party", 
        description: "get the party started",
        songs: 2 
    },
];

const SAMPLE_SONGS: { [key: string]: Song[] } = {
    "1": [
        { id: "101", title: "Party Rock Anthem", artist: "LMFAO", duration: "4:23" },
        { id: "102", title: "I Gotta Feeling", artist: "The Black Eyed Peas", duration: "4:49" },
        { id: "103", title: "Can't Stop the Feeling!", artist: "Justin Timberlake", duration: "4:45" },
    ],
    "2": [
        { id: "201", title: "Get Lucky", artist: "Daft Punk ft. Pharrell Williams", duration: "6:09" },
        { id: "202", title: "Don't Stop the Music", artist: "Rihanna", duration: "4:27" },
    ],
};

export function PlaylistProvider({ children }: { children: ReactNode }) {
    const [playlists, setPlaylists] = useState<Playlist[]>(SAMPLE_PLAYLISTS);
    const [songs, setSongs] = useState<{ [key: string]: Song[] }>(SAMPLE_SONGS);

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