import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Playlist, { IPlaylist } from "@/models/Playlist";

interface PlaylistResponse {
  id: string;
  name: string;
  description: string;
  songs: number;
}

interface ApiResponse {
  success: boolean;
  data?: PlaylistResponse | PlaylistResponse[];
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const playlists = await Playlist.find({}).sort({
          createdAt: -1,
        });

        const formattedPlaylists: PlaylistResponse[] = playlists.map((p) => ({
          id: p.id.toString(),
          name: p.name,
          description: p.description || "",
          songs: 0,
        }));
        res.status(200).json({
          success: true,
          data: formattedPlaylists,
        });
      } catch (error) {
        console.error("Error fetching playlists:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch playlists",
        });
      }
      break;

    case "POST":
      try {
        const { name, description } = req.body;
        if (!name || typeof name !== "string") {
          return res.status(400).json({
            success: false,
            message: "Playlist name is required",
          });
        }

        const playlist = await Playlist.create({
          name,
          description: description || "",
        });

        const formattedPlaylist: PlaylistResponse = {
          id: playlist.id.toString(),
          name: playlist.name,
          description: playlist.description || "",
          songs: 0,
        };

        res.status(201).json({
          success: true,
          data: formattedPlaylist,
        });
      } catch (error: any) {
        console.error("Error creating playlist:", error);
        res.status(400).json({
          success: false,
          message: error.message || "Failed to create playlist",
        });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).json({
        success: false,
        message: `Method ${method} Not Allowed`,
      });
      break;
  }
}
