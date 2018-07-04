const express = require('express');
const app = express();
const mongoose = require('mongoose');
const TokenGenerator = require('uuid-token-generator');

const User = require('./../models/user');

app.post ('/signup', (req, res, next) =>{
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
        passwh: req.body.passwh,
        token: null
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


app.post('/signin', (req,res,next) => {
    User.findOne({ email: req.body.email }, (err, founded) => {
      if(err) {
          res.status(500).json({
              message: 'Внутренняя ошибка сервера'
          })
      } else if (!founded) {
          res.status(404).json({
              message: 'Введён неверный пароль'
          })
      } else {
          const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);
          founded.token = tokgen.generate();
          founded.save((err, updated) => {
          if(err) {
              res.status(500).json({
                  message: 'Внутренняя ошибка сервера'
              })
          } else {
              res.send({ token: updated.token, id: updated._id });
          }
          });
      }
    })
});

app.get('/', (req, res, next) => {
  User.find()
    .select('name surname email passwh')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        user: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.surname,
            email: doc.email,
            request: {
              type: 'GET',
              url: 'http://localhost:8000/user/' + doc._id
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = app;