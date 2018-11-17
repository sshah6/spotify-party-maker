const express = require('express');
const router = express.Router();
require('dotenv').config();
const User = require('../models/user');
const Party = require('../models/party')
let request = require('request');
let querystring = require('query-string');
var spotifyUri = require('spotify-uri');



let redirect_uri =
  process.env.REDIRECT_URI ||
  'http://localhost:3001/spotify/callback'

router.get('/login', function(req, res) {
  req.session.save((err)=>{ 
    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email playlist-read-private playlist-modify-private playlist-modify-public',
      redirect_uri
    }))
  })
  
})

router.get('/callback', function(req, res) {
  // console.log(req.session, 'spotify callback')

  let code = req.query.code || null
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, function(error, response, body) {
    console.log(body, 'Body in Spotify login')
    console.log(req.session, 'sessions in callback')
    const userId = req.session.userId
    
    var access_token = body.access_token
    var refresh_token = body.refresh_token
    req.session.access_token = access_token
    const updateUser = User.findByIdAndUpdate(userId,{
      spotifyAccessToken: access_token,
      spotifyRefreshToken: refresh_token
    }, {new:true}).then((value)=> { 
      console.log(value, 'THIS IS VALUE')
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000/profile'
    req.session.save((err)=>{
      res.redirect(uri)
    })
     
  
  });
    
    
    
    
  })
})

router.get('/refresh_token/', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token ;
  console.log(refresh_token)
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      console.log(access_token);
      res.send({
        'access_token': access_token
      });
    } else (
      console.log(error, 'error??')
    )
  });
});

router.get('/party/:URI', async(req,res) => {
  console.log(req.session, 'in the /me')
try {
  const URI = spotifyUri.parse(req.params.URI)
  const userId =URI.user;
  console.log(userId)
  const playlistId = URI.id;
  console.log(URI);
  const foundUser = await User.findOne({ 
    'hostedParties.playlistID': req.params.URI
  })
  const foundParty = await Party.findOne({ 
    playlistID: req.params.URI
  })
  console.log( foundUser.username, "User info")
  console.log( foundParty, "PArty info HOSTING PARTY")

  const response = {
    "username": foundUser.username,
    "access_token": foundUser.spotifyAccessToken,
    "date": foundParty.date,
    "location": foundParty.location,
    "zip": foundParty.zip,
    "information": foundParty.information,

  } 
  console.log(response)
    res.json(response)
  
}
catch (err) {
  res.json(err)
}
  // let options = {
  //   url: 'https://api.spotify.com/v1/me',
  //   headers: {'Authorization': 'Bearer ' + req.session.access_token},
  //   method: 'GET',
  //   json: true
  // }
  // request.get( options, function(error, response, body) {
  //   if (!error && response.statusCode === 200) {
  //     res.json({body})
  //   } else (
  //     console.log(error, 'error??')
  //   )
  // })

})



module.exports = router;