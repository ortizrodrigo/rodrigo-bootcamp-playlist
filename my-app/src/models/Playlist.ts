import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IPlaylist extends Document {
  name: string;
  description?: string;
  createdAt: Date;
}

const PlaylistSchema: Schema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  description: { type: String, maxlength: 500 },
  createdAt: { type: Date, default: Date.now },
});

const Playlist: Model<IPlaylist> =
  models.Playlist || mongoose.model<IPlaylist>("Playlist", PlaylistSchema);

export default Playlist;
