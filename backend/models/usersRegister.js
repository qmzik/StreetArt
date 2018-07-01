const mongoose = require('mongoose');

const usersRegisterSchema = mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    passwh: String
});

module.exports = mongoose.model('UsersRegister', usersRegisterSchema);