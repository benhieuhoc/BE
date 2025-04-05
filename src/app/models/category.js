const mongoose = require('mongoose');

const CategorySchema =new mongoose.Schema({
    name_category:{type: String, require: true},
});

module.exports = mongoose.model("Category", CategorySchema);
