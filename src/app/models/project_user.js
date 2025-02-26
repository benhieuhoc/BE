const mongoose = require('mongoose');

const ProjectUserSchema = new mongoose.Schema({
    project_id:{
        ref: "Project",
        type: mongoose.SchemaTypes.ObjectId,
    },  
    user_id:{
        ref: "User",
        type: mongoose.SchemaTypes.ObjectId,
    },
},{
    timestamps: true
});

module.exports = mongoose.model("Project_User", ProjectUserSchema);
