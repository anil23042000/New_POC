const mongoose = require('mongoose');
var employeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ctc: {
        type: String,
        required: true
    }
});

mongoose.model('Employee', employeSchema);