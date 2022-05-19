const mongoose = require('mongoose');

const characterSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    species:{
        type: String,
        required : true
    },
    gender:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Character',characterSchema);