// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const SAMPLE_PLAYLISTS = [
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

const SAMPLE_SONGS = {
    "1": [
        { id: "101", title: "Party Rock Anthem", artist: "LMFAO", duration: "04:23" },
        { id: "102", title: "I Gotta Feeling", artist: "The Black Eyed Peas", duration: "04:49" },
        { id: "103", title: "Can't Stop the Feeling!", artist: "Justin Timberlake", duration: "04:45" },
    ],
    "2": [
        { id: "201", title: "Get Lucky", artist: "Daft Punk ft. Pharrell Williams", duration: "06:09" },
        { id: "202", title: "Don't Stop the Music", artist: "Rihanna", duration: "04:27" },
    ],
};

export default function handler(req, res) {
    if (req.method === "GET") {
        // return the sample playlist data as JSON
        res.status(200).json({
            playlists: SAMPLE_PLAYLISTS,
            songs: SAMPLE_SONGS,
        });
    } else {
        // handle unsupported methods
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}