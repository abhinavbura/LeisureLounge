const mongoose = require("mongoose");
const musicSchema = new mongoose.Schema({
  moviename: { type: String, required: true },
  director: { type: String, required: true },
  description: { type: String },
  timesPlayed: { type: Number, default: 0 },
  rating: { type: String, required: true },
  imgpath: { type: String, required: true },
  moviepath: { type: String, required: true },
});

const Movies = mongoose.model("Movies", musicSchema);
module.exports = Movies;
