const mongoose = require('mongoose');

const TaskUserSchema = new mongoose.Schema({
    task_id:{
        ref: "Task",
        type: mongoose.SchemaTypes.ObjectId,
    },  
    user_id:{
        ref: "User",
        type: mongoose.SchemaTypes.ObjectId,
    },
},{
    timestamps: true
});

module.exports = mongoose.model("Project_User", TaskUserSchema);
