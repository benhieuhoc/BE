const mongoose = require('mongoose');

const defaultRoleId = new mongoose.Types.ObjectId("67b42ba93784278dad206bc2");


const AdminSchema =new mongoose.Schema({
    email:{type: String, require: true},
    username:{type: String, require: true},
    password:{type: String, require: true},
    name:{type: String},
    phone:{type: String},
    role:{
        ref: "Role",
        type: mongoose.SchemaTypes.ObjectId,
        default: defaultRoleId,
    },
});

module.exports = mongoose.model("Admin", AdminSchema);
