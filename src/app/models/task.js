const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    nametask:{type: String, require: true},
    description:{type: String},
    pre_task:{type: String},
    next_task:{type: String},
    day_start:{type: Date},
    time:{type: Intl},
    day_end:{type: Date},
    status:{type: Boolean, default: false},
    
},{
    timestamps: true,
});

module.exports = mongoose.model("Task", TaskSchema);
