const mongoose = require ('mongoose');


const Schema = mongoose.Schema;
const RoleSchema = new Schema({
    role:{type: String},    
});

module.exports = mongoose.model('Role', RoleSchema);
