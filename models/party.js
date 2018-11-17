const mongoose = require('mongoose');
const User = require ('./user');

const PartySchema = new mongoose.Schema({
  name: String,
  date: Date,
  location: String,
  zip: String,
  information: String,
  playlistID: String,
  searchTrackName: String, // Text Input for search tracking
  searchArtistName: String // Text Input for search tracking
  // we need the playlist id here
})

module.exports = mongoose.model('Party', PartySchema);
