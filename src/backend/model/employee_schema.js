const mongoose = require('mongoose');
var employeSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    employee_id: { type: String, required: true },
    employee_role: { type: String, required: true },
    employee_phone: { type: String, required: true },
    employee_dob: { type: String },
    current_org_experience: { type: String },
    previous_org_experience: { type: String },
    current_ctc: { type: String },
    primary_skills: { type: String },
    secondary_skills: { type: String },
    status: { type: String },
    reporting_manager: { type: String }
});

mongoose.model('Employee', employeSchema);