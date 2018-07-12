const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const TokenGenerator = require('uuid-token-generator');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

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
  User.findOne({ username: req.body.username }, (err, founded) => {
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

app.post('/status', (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, founded) => {
    if(err) {
      res.status(500).json({
          message: status.INTERNAL_SERVER_ERROR
      })
    } else if (!founded) {
      res.status(404).json({
          message: status.DOES_NOT_EXIST
      })
    } else {
      if(err) {
          res.status(500).json({
              message: status.INTERNAL_SERVER_ERROR
          })
      } else {
        if (req.body.username == founded.username && req.body.token == founded.token && req.body._id == founded._id) {
          res.send ({status: 'owner'})
        } else {
          res.send ({status: 'guest'})
        }
      } 
    }
  })
});

app.get('/:username', (req,res,next) => {
  User.findOne({ username: req.params.username }, (err, founded) => {
    if(err) {
      res.status(500).json({
          message: status.INTERNAL_SERVER_ERROR
      })
    } else if (!founded) {
      res.status(404).json({
          message: status.DOES_NOT_EXIST
      })
    } else {
      if(err) {
          res.status(500).json({
              message: status.INTERNAL_SERVER_ERROR
          })
      } else {
          res.send({name: founded.name, surname: founded.surname, email: founded.email, projectId: founded.projectId});
      } 
    }
  })
});

module.exports = app;