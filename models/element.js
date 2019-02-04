const mongoose = require('mongoose');

let element = mongoose.model('element', {
    description: {
        type: String
    },
    provider: {
        type:  String
    },
    unit: {
        type: String
    },
    min: {
        type: Number
    },
    max: { 
        type: Number
    },
    type: {
        type: String
    },
    stock: {
        type: Number
    },
    createdAt: {
        type: Number
    }
});

module.exports = {element}