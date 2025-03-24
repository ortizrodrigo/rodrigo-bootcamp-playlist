import { useRouter } from "next/router";
import { usePlaylist } from "@/contexts/PlaylistContext";

export default function PlaylistDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { playlists, tracks } = usePlaylist();

  if (!id || typeof id !== "string") {
    return (
      <main className="flex-grow flex items-center justify-center">
        <p>Loading playlist...</p>
      </main>
    );
  }

  const playlist = playlists.find((p) => p.id === id);
  const playlistTracks = tracks[id] || [];

  if (!playlist) {
    return (
      <main className="flex-grow flex items-center justify-center">
        <p>Playlist not found</p>
      </main>
    );
  }

  return (
    <main className="flex-grow p-6">
      <h1 className="text-5xl font-bold mt-2 mb-4">{playlist.name}</h1>

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
            {playlistTracks.map((track, index) => (
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