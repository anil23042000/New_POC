const mongoose = require('mongoose');

var project_resource_schema = new mongoose.Schema({
    projectID: {type: String,required: true},
    employeeId: {type: String,required: true},
    role:{type: String,required: true},
    status: {type: String,required: true},
    projectStartDate: {type: Date,required: true},
    projectEndDate: {type: Date},
    billable: {type: Boolean}
});


mongoose.model('Project_Resource', project_resource_schema);