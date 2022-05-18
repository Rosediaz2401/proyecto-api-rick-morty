const mongoose = require('mongoose');

const characterSchema = mongoose.Schema({
    name:{
        type: String,
      
    },
    status: {
        type: String,
      
    },
    species:{
        type: String,
       
    },
    gender:{
        type: String,
        
    },
    image:{
        type: String,

    }
});

module.exports = mongoose.model('Character',characterSchema);