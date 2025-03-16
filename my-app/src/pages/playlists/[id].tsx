import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

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

const SAMPLE_TRACKS: { [key: string]: Track[] } = {
  "1": [
    { id: "101", title: "song1", artist: "artist1", duration: "3:45" },
    { id: "102", title: "song2", artist: "artist2", duration: "4:12" },
    { id: "103", title: "song3", artist: "artist3", duration: "3:33" },
    { id: "104", title: "song4", artist: "artist4", duration: "2:55" },
    { id: "105", title: "song5", artist: "artist5", duration: "3:22" },
  ],
  "2": [
    { id: "201", title: "Study Session", artist: "BrainWave", duration: "4:20" },
    { id: "202", title: "Deep Learning", artist: "Neural Network", duration: "3:15" },
    { id: "203", title: "Midnight Oil", artist: "Cramming", duration: "2:45" },
    { id: "204", title: "Final Countdown", artist: "Exam Ready", duration: "3:50" },
  ],
};

const SAMPLE_PLAYLISTS: { [key: string]: Playlist } = {
  "1": { id: "1", name: "Coding Focus", tracks: 5},
  "2": { id: "2", name: "Study Beats", tracks: 4},
};

export default function PlaylistDetail() {
  const router = useRouter();
  const { id } = router.query;
  // Update useState to use Playlist type instead of null
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    if (id && typeof id === 'string') {
      setPlaylist(SAMPLE_PLAYLISTS[id] ?? null);
      setTracks(SAMPLE_TRACKS[id] ?? []);
    }
  }, [id]);

  if (!playlist) {
    return (
      <main className="flex-grow flex items-center justify-center">
        <p>Loading playlist...</p>
      </main>
    );
  }

  return (
    <main className="flex-grow p-6">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex flex-col justify-end">
          <h1 className="text-5xl font-bold mt-2 mb-4">{playlist.name}</h1>
          <p className="text-gray-400">{playlist.tracks} songs</p>
        </div>
      </div>

      <div className="bg-gray-900 rounded-md p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400 text-left">
              <th className="pb-2 w-12">#</th>
              <th className="pb-2">TITLE</th>
              <th className="pb-2">ARTIST</th>
              <th className="pb-2 text-right">DURATION</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track, index) => (
              <tr key={track.id} className="hover:bg-gray-800 group">
                <td className="py-3 text-gray-400">{index + 1}</td>
                <td className="py-3 font-medium group-hover:text-green-400">{track.title}</td>
                <td className="py-3 text-gray-400">{track.artist}</td>
                <td className="py-3 text-gray-400 text-right">{track.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}