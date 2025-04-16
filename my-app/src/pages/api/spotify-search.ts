import type { NextApiRequest, NextApiResponse } from "next";

type SpotifyTrack = {
  id: string;
  title: string;
  artist: string;
  duration: string;
  image?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { q } = req.query;
  if (!q || typeof q !== "string") {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    // get Spotify credentials from environment variables
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      console.error("Spotify credentials missing:", {
        clientId: !!clientId,
        clientSecret: !!clientSecret,
      });
      return res
        .status(500)
        .json({ error: "Spotify credentials not configured" });
    }

    // get access token
    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64"
    );
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${authString}`,
        },
        body: "grant_type=client_credentials",
      }
    );

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Failed to get Spotify token:", {
        status: tokenResponse.status,
        statusText: tokenResponse.statusText,
        errorText,
      });
      return res
        .status(500)
        .json({ error: "Failed to get Spotify token", details: errorText });
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // search Spotify
    const searchResponse = await fetch(
      `https://api.spotify.com/v1/search?type=track&limit=10&q=${encodeURIComponent(
        q
      )}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text();
      console.error("Spotify search failed:", {
        status: searchResponse.status,
        statusText: searchResponse.statusText,
        errorText,
      });
      return res
        .status(500)
        .json({ error: "Spotify search failed", details: errorText });
    }

    const searchData = await searchResponse.json();

    // format results to match our Song interface
    const tracks: SpotifyTrack[] = searchData.tracks.items.map(
      (track: any) => ({
        id: track.id,
        title: track.name,
        artist: track.artists.map((a: any) => a.name).join(", "),
        duration: new Date(track.duration_ms).toISOString().substr(14, 5),
        image: track.album.images[0]?.url,
      })
    );

    res.status(200).json({ tracks });
  } catch (error) {
    console.error("Spotify search error:", error);
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    } else {
      res
        .status(500)
        .json({ error: "Internal server error", details: String(error) });
    }
  }
}
