const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    surname: String,
    username: String,
    email: { 
        type: String, 
        required: true, 
        unique: true, 
    },  
    passwh: String,
    token: String,
    projectId: Array
});

module.exports = mongoose.model('User', userSchema);