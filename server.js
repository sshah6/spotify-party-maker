//REQUIREMENTS
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");


// set up bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//DATABASE
require('./scripts/db');

// SESSIONS
app.use(session({
  secret: 'cantTellYou',
  resave: false,
  saveUninitialized: false,
}))



//CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));


//CONTROLLERS
const authController = require('./controllers/authController');
const mainController = require('./controllers/mainController');
const spotifyController = require('./controllers/spotifyController');
const userController = require('./controllers/userController');


if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
//ROUTES
app.use('/auth', authController);
app.use('/api/v1/main', mainController );
app.use('/spotify', spotifyController);
app.use('/user', userController);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/partyPotensh");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
