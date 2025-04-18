const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    nameproject:{type: String, require: true},
    author_id:{
        ref: "User",
        type: mongoose.SchemaTypes.ObjectId,
    },
    member_id:[{
        ref: "User",
        type: mongoose.SchemaTypes.ObjectId,
    }],
    category_id:{
        ref: "Category",
        type: mongoose.SchemaTypes.ObjectId,
    },
    task_id:[{
        ref: "Task",
        type: mongoose.SchemaTypes.ObjectId,
    }],
   description:{type: String, require: true},
   dateEnd:{type: Date, require: true},

},{
    timestamps: true,
});

module.exports = mongoose.model("Project", ProjectSchema);
