const express = require('express');
const app = express();
const mongoose = require('mongoose');
const TokenGenerator = require('uuid-token-generator');
const status = require('../consts/status_messages');
const User = require('./../models/user');

app.post ('/signup', (req, res, next) => {
  User.find({ email: req.body.email })
  .exec()
  .then(user => {
    if (user.length >= 1) {
      return res.status(409).json({
        message: status.CONFLICT
      });
    } else {  
        const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        email: req.body.email,
        passwh: req.body.passwh,
        token: null
    });
    user
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: status.CREATED
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: status.INTERNAL_SERVER_ERROR
        });
      });
    }
  });
});

app.post('/signin', (req,res,next) => {
  User.findOne({ email: req.body.email }, (err, founded) => {
    if(err) {
      res.status(500).json({
          message: status.INTERNAL_SERVER_ERROR
      })
    } else if (!founded) {
      res.status(404).json({
          message: status.NOT_FOUND
      })
    } else {
      const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);
      founded.token = tokgen.generate();
      founded.save((err, updated) => {
      if(err) {
          res.status(500).json({
              message: status.INTERNAL_SERVER_ERROR
          })
      } else {
          res.send({ token: updated.token, id: updated._id });
      }
      });
    }
  })
});

app.post('/', (req, res, next) => {
  User.findById(req.body.id)
  .exec()
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    res.status(500).json({
      message: status.INTERNAL_SERVER_ERROR
    })
  })
});

app.get('/:username', (req, res, next) => {
  const username = req.params.username;
  User.findOne(req.param.username)
    .select('name surname username token _id')
    .exec()
    .then(doc => {
      if (doc) {
        res.send({ name: doc.name, surname: doc.surname, token: doc.token, _id: doc._id})
      } else {
        res
          .status(404)
          .json({ 
            message: status.NOT_FOUND
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = app;