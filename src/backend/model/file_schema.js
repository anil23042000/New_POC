const mongoose = require('mongoose');

var fileSchema = new mongoose.Schema({
    filePath: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    employeeId: {
        type: String,
        required: true
    },
    dateAndTime: {
        type: String,
        default: Date
    }
});

mongoose.model('File', fileSchema);