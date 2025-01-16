const mongoose = require ('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/TaskManager_dev')
        console.log('Connected!');
    }catch (error) {
        console.log('Fail Connected');
    }
}

module.exports = { connect };
