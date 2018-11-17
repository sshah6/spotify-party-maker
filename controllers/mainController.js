const express = require('express');
const router = express.Router();
const Party = require('../models/party');
const User = require('../models/user');

//INDEX ROUTE
 router.get('/', async (req, res, next) => {
  
     try  {
      
        console.log(req.session, ' this is get all')
        const currentUser = await User.findById(req.session.userId);
        const allParties = currentUser.hostedParties;
  
        res.json({
          status: 200,
          data: allParties,
          user: currentUser
        })
       
      

    } catch (err){
      res.send(err)
    }
});


// CREATE new party
router.post('/', async (req, res) => {
  try {
    console.log(req.body, ' this is req.body');
    const findUser = await User.findById(req.session.userId);
    const createdParty= await Party.create(req.body);
    // const [foundUser, createParty] = await Promise.all([findUser, createdParty]);
    await findUser.hostedParties.push(createdParty);
    await findUser.save();
    console.log(await findUser);
    res.json({
      status: 200,
      data: createdParty
    });
  } catch(err){
    console.log(err);
    res.send(err);
  }
});




//Get party
router.get('/:id', async (req, res, next) => {
     try  {

        const foundParty = await Party.findById(req.params.id);
        res.json({
        status: 200,
        data: getParty
        });

      } catch (err){
        res.send(err);
      }



});


//Update party
router.put('/:id', async (req, res) => {
  try {
    const updateParty = await Party.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json({
      status: 200,
      data: updateParty
    });
  } catch(err){
    res.send(err)
  }
});


// Delete party
router.delete('/:id', async (req, res) => {
  try {
    console.log(req.params.id);
     const deletedParty = await Party.findByIdAndRemove(req.params.id);
     const userPartyDelete = await User.findOne({'hostedParties._id': req.params.id});
     const parties = userPartyDelete.hostedParties
     console.log(req.params.id, 'REQ PARAMS')
     console.log(parties.length, 'users delete parties')
     for (let i= 0; i<parties.length; i++) {
       console.log(parties[i]._id)
       if(parties[i]._id == req.params.id) {
         parties.splice(i,1);
         
       }
     }
     userPartyDelete.save()
      res.json({
        status: 200,
        data: deletedParty
      });
  } catch(err){
    res.send(err);
  }
});



module.exports = router;
