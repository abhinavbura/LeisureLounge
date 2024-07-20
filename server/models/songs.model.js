const mongoose = require("mongoose");
const musicSchema = new mongoose.Schema({
  songName: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String },
  timesPlayed: { type: Number, default: 0 },
  songpath: { type: String, required: true },
  imgpath: { type: String, required: true },
});

const Music = mongoose.model("Music", musicSchema);
module.exports = Music;
