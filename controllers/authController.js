const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/register', async (req,res,err) => {
  console.log(req.session, ' this is session')
try{
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const userDbEntry = {};
  userDbEntry.username = req.body.username;
  userDbEntry.password = passwordHash;


let createdUser= await User.create(userDbEntry,(err,createdUser) => {
    req.session.logged = true;
    req.session.username = req.body.username;
    console.log(createdUser);
    res.json({
      status: 200,
      data: 'register successful'
    });
  })
}

   catch(err){
    console.log(err);
    res.send(err);
  }

})

router.post('/login', (req,res) => {
  console.log(req.session, ' this is session');
User.findOne({username: req.body.username}, (err, user) => {
  if (user) {
      console.log(user, 'THIS IS the users data on login Route');
      if (bcrypt.compareSync(req.body.password, user.password)) {
        req.session.username = user.username;
        req.session.loggedIn = true;
        req.session.userId = user._id;
        res.json({
          status: 200,
          data: 'login successful',
          userID: user._id
        });
        } else {
          res.json({
          status: 404,
          data: 'Password incorrect'
        });
      }
    } else {
      res.json({
      status: 404,
      data: 'Username incorrect'
    })
  }
})
})

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.json({
      status: 404,
      data: 'log out unsuccessful',
    });
    } else {
      res.json({
      status: 200,
      data: 'Logout successful'
     })
   }
 })
})




module.exports = router;
