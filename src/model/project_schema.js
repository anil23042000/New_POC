const mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    projectStartDate: {
        type: Date,
        required: true
    },
    projectEndDate: {
        type: Date
    }
});


mongoose.model('Projects', projectSchema);