const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the song schema
const songSchema = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  singer: { type: String, required: true },
});

// Define the playlist schema
const playlistSchema = new Schema({
  playlistName: { type: String, required: true },
  numberOfSongs: { type: Number, default: 0 },
  details: [songSchema], // Array of songs
});

// Create a model for Playlist using the schema
const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
