const mongoose = require('mongoose');

const defaultRoleId = new mongoose.Types.ObjectId("67b42bda3784278dad206bc3");


const UserSchema =new mongoose.Schema({
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

module.exports = mongoose.model("User", UserSchema);
