const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: { 
        type: String,
        required: true,
        unique: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true
    },  
    passwh: {
        type: String,
        required: true
    },
    userAvatar: {
        contentType: String,
        data: Buffer
    },
    token: String,
    projectId: Array
});

module.exports = mongoose.model('User', userSchema);