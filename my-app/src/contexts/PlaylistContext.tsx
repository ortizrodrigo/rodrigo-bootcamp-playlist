import { createContext, useContext, useState, ReactNode } from 'react';

const INITIAL_PLAYLISTS = [
  { id: "1", name: "Coding Focus", tracks: 5},
  { id: "2", name: "Study Beats", tracks: 4},
];

const INITIAL_TRACKS = {
  "1": [
    { id: "101", title: "Focus Mode", artist: "CodeMaster", duration: "3:45" },
    { id: "102", title: "Algorithm Flow", artist: "ByteBeats", duration: "4:12" },
    { id: "103", title: "Recursive Dreams", artist: "StackOverflow", duration: "3:33" },
    { id: "104", title: "Function Harmony", artist: "DevOps", duration: "2:55" },
    { id: "105", title: "Binary Sunset", artist: "GitMaster", duration: "3:22" },
  ],
  "2": [
    { id: "201", title: "Study Session", artist: "BrainWave", duration: "4:20" },
    { id: "202", title: "Deep Learning", artist: "Neural Network", duration: "3:15" },
    { id: "203", title: "Midnight Oil", artist: "Cramming", duration: "2:45" },
    { id: "204", title: "Final Countdown", artist: "Exam Ready", duration: "3:50" },
  ],
};

type Playlist = {
  id: string;
  name: string;
  tracks: number;
};

type Track = {
  id: string;
  title: string;
  artist: string;
  duration: string;
};

type PlaylistContextType = {
  playlists: Playlist[];
  getPlaylist: (id: string) => Playlist | undefined;
  getPlaylistTracks: (id: string) => Track[];
  createPlaylist: (name: string) => void;
  addTrackToPlaylist: (playlistId: string, track: Track) => void;
};

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export function PlaylistProvider({ children }: { children: ReactNode }) {
  const [playlists, setPlaylists] = useState<Playlist[]>(INITIAL_PLAYLISTS);
  const [tracks, setTracks] = useState<Record<string, Track[]>>(INITIAL_TRACKS);

  const getPlaylist = (id: string) => {
    return playlists.find(playlist => playlist.id === id);
  };

  const getPlaylistTracks = (id: string) => {
    return tracks[id] || [];
  };

  const createPlaylist = (name: string) => {
    const newId = String(Date.now());
    const newPlaylist = {
      id: newId,
      name,
      tracks: 0,
    };
    
    setPlaylists([...playlists, newPlaylist]);
    setTracks({
      ...tracks,
      [newId]: []
    });
  };

  const addTrackToPlaylist = (playlistId: string, track: Track) => {
    const playlistTracks = [...(tracks[playlistId] || []), track];
    
    setTracks({
      ...tracks,
      [playlistId]: playlistTracks
    });
    
    setPlaylists(playlists.map(playlist => 
      playlist.id === playlistId 
        ? { ...playlist, tracks: playlistTracks.length }
        : playlist
    ));
  };

  return (
    <PlaylistContext.Provider value={{
      playlists,
      getPlaylist,
      getPlaylistTracks,
      createPlaylist,
      addTrackToPlaylist
    }}>
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylist() {
  const context = useContext(PlaylistContext);
  if (context === undefined) {
    throw new Error('usePlaylist must be used within a PlaylistProvider');
  }
  return context;
}