const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UsersRegister = require('./../models/usersRegister');


app.post ('/', (req, res, next) =>{
    const usersRegister = new UsersRegister({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        passwh: req.body.passwh
    });
    usersRegister
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
});


/* app.get ('/checker', (req, res, next)=>{
    UsersRegister.findById('5b38e0db40549486ed')
    .exec()
    .then(res => console.log(res))
    .catch(err => {
        console.log(err);
    });
}); */
module.exports = app;