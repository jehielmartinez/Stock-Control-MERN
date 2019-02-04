const mongoose = require('mongoose');

let provider = mongoose.model('provider', {
    company: {
        type: String
    },
    address: {
        type: String
    },
    contact: {
        type: String
    },
    mobile: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    createdAt: {
        type: Number
    }
})

module.exports = {provider}