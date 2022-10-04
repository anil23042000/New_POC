const mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    project_name: {type: String,required: true},
    project_id: {type: String,required: true},
    client_name:{type:String,required:true},
    projectStartDate: {type:  Date,required: true},
    projectEndDate: {type:  Date,},
    status:{type:String,required:true},
    delivery_manager:{type:String},
    engagement_director :{type:String},
    delivery_director :{type:String},
    project_manager :{type:String},
    bu :{type:String},
    reasonfor_close :{type:String},
    project_type :{type:String},
    project_budget :{type:String}
});
mongoose.model('Project', projectSchema);