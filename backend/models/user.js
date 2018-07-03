const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    surname: String,
    email: { 
        type: String, 
        required: true, 
        unique: true, 
    },
    passwh: String
});

module.exports = mongoose.model('User', userSchema);