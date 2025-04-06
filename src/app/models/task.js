const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    nametask:{type: String, require: true},
    user_id:{
        ref: "User",
        type: mongoose.SchemaTypes.ObjectId,
    },
    description:{type: String},
    day_start:{type: Date},
    day_end:{type: Date},
    status:{type: Boolean, default: false},
    
},{
    timestamps: true,
});

module.exports = mongoose.model("Task", TaskSchema);
