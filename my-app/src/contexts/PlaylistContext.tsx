import { createContext, useContext, useState, ReactNode } from "react";

interface Playlist {
    id: string;
    name: string;
    tracks: number;
}

interface Track {
    id: string;
    title: string;
    artist: string;
    duration: string;
}

interface PlaylistContextType {
    playlists: Playlist[];
    tracks: { [key: string]: Track[] };
    addPlaylist: (newPlaylist: Playlist, newTracks: Track[]) => void;
    editPlaylist: (id: string, updatedPlaylist: Partial<Playlist>) => void;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

const SAMPLE_PLAYLISTS: Playlist[] = [
    { id: "1", name: "Retreat", tracks: 3 },
    { id: "2", name: "Party", tracks: 2 },
];

const SAMPLE_TRACKS: { [key: string]: Track[] } = {
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
    const [tracks, setTracks] = useState<{ [key: string]: Track[] }>(SAMPLE_TRACKS);

    const addPlaylist = (newPlaylist: Playlist, newTracks: Track[]) => {
        setPlaylists((prev) => [...prev, newPlaylist]);
        setTracks((prev) => ({ ...prev, [newPlaylist.id]: newTracks }));
    };

  const editPlaylist = (id: string, updatedPlaylist: Partial<Playlist>) => {
    setPlaylists((prev) =>
        prev.map((playlist) => playlist.id === id ? { ...playlist, ...updatedPlaylist } : playlist)
    );
  };

  return (
    <PlaylistContext.Provider value={{ playlists, tracks, addPlaylist, editPlaylist }}>
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