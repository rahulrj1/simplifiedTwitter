const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    tweetIDs: [
        {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: 'Tweet'
        }
    ]
})

module.exports = mongoose.model('User', userSchema);