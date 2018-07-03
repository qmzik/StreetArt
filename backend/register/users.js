const express = require('express');
const app = express();
const mongoose = require('mongoose');

const User = require('./../models/user');


app.post ('/', (req, res, next) =>{
  User.find({ email: req.body.email })
  .exec()
  .then(user => {
    if (user.length >= 1) {
      return res.status(409).json({
        message: "Mail exists"
      });
    } else {  
  const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        passwh: req.body.passwh
    });
    user
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Successfully created"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
    }
  });
});


app.get ('/checker', (req, res, next)=>{
    User.find({email: 'dasdas@gmail.com'})
    .exec()
    .then(res => console.log(res))
    .catch(err => {
        console.log(err);
    });
}); 
module.exports = app;