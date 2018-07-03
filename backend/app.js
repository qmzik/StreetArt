const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(
    "mongodb://josephen:" +
    process.env.MONGO_ATLAS_PW +
    "@startup-site-shard-00-00-qwaqu.mongodb.net:27017,startup-site-shard-00-01-qwaqu.mongodb.net:27017,startup-site-shard-00-02-qwaqu.mongodb.net:27017/test?ssl=true&replicaSet=startup-site-shard-0&authSource=admin"
);
mongoose.Promise = global.Promise;


const users = require('./register/users');

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/user', users);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;