const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({ 
    title: String, 
    description: String, 
    date: Date, 
    projectId: String 
    })

module.exports = mongoose.model('Project', projectSchema);