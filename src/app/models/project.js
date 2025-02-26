const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    nameproject:{type: String, require: true},
    author:{
        ref: "User",
        type: mongoose.SchemaTypes.ObjectId,
    },
   description:{type: String, require: true}
},{
    timestamps: true,
});

module.exports = mongoose.model("Project", ProjectSchema);
