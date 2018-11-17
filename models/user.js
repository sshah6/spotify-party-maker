const mongoose = require('mongoose');
const Party = require('./party');

const UserSchema = new mongoose.Schema({
  username: String,
  password: {type: String, required: true},
  hostedParties: [Party.schema],
  spotifyID: String,
  spotifyAccessToken: String,
  spotifyRefreshToken: String
// we need to add the user's spotify id so it can save to our database
// we need to try to store the access token here
})
// we need to next the party schema here
module.exports = mongoose.model('User', UserSchema);
