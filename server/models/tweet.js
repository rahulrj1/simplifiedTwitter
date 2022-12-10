const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    tweetMessage: {
        type: String,
        required: true
    }
    ,
    tweetUser: {
        type: mongoose.Schema.ObjectId,
        ref: 'User', 
        required: true
    }
})

module.exports = mongoose.model('Tweet', tweetSchema);