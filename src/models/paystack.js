const mongoose = require('mongoose');

const PayData = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    ref: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }

})

const paydata = mongoose.model('payData', PayData)
module.exports = paydata