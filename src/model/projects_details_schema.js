const mongoose = require('mongoose');

var ProjectDetails = new mongoose.Schema({
    projectID: {
        type: String,
        required: true
    },
    employeeId: {
        type: String,
        required: true
    },
    projectStartDate: {
        type: Date,
        required: true
    },
    projectEndDate: {
        type: Date
    },
    role: {
        type: String,
        required: true
    },
    reportingManager: {
        type: String,
        required: true
    }

});


mongoose.model('ProjectDetails', ProjectDetails);