const express = require('express');
const app = express();
const mongoose = require('mongoose');
const TokenGenerator = require('uuid-token-generator');
const status = require('../consts/status_messages');
const Project = require('./../models/project');

app.post ('/create', (req, res, next) => {
    const project = new Project({
        title: req.body.title, 
        description: req.body.description, 
        date: req.body.date, 
        projectId: req.body.projectId 
      });
      project
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
});

  module.exports = app;