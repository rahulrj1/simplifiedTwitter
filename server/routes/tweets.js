const express = require('express')
const router = express.Router()
const Tweet = require('../models/tweet')
const User = require('../models/user')

// homePage
router.get('/tweets', async (req, res) => {
    try {
        const tweets = await Tweet.find()
        const users = await User.find()
        res.json({
            tweets:tweets,
            users: users
        })
    } catch(err) {  
        res.status(500).json({message: err.message})
    }
})

// get tweets by user id 
router.get('/user/:userID', async (req, res) => {
    try {
        const tUser = await User.find({userId: req.params.userID})
        const tweets = await Tweet.find({tweetUser: tUser})
        res.json({
            messageToViewer:"These are the requested tweets",
            tweets:tweets
        })
    } catch(err) {  
        res.status(500).json({message: err.message})
    }
})

// getTweet by tweet Id
router.get('/tweet/:tId', async (req, res) => {
    try {
        const tweets = await Tweet.findById(req.params.tId)
        res.json({
            messageToViewer:"This is the requested tweet",
            tweets:tweets
        })
    } catch(err) {  
        res.status(500).json({message: err.message})
    }
})


// Find user
// router.post('/user', async (req, res) => {
//     User.countDocuments({userId: req.body.uId}, async (err, count) => { 
//         try {
//             if(count>0){
//                 const foundUser = await User.findOne({userId: req.body.uId});
//                 res.status(200).json(foundUser)
//             }
//             else {
//                 const newUser = new User({
//                     userId: req.body.uId
//                 })
//                 const savedNewUser = await newUser.save()
//                 res.status(200).json(savedNewUser)
//             }
//         } catch (err) {
//             res.status(400).json({message: err.message})
//         }
        
//     });
// })

// createTweet
router.post('/createTweet', async (req, res) => {
    User.countDocuments({userId: req.body.uId}, async (err, count) => { 
        if(count<1) {
            let newUser = new User({
                userId: req.body.uId
            })
            let tUser =  await newUser.save();
            const tweet = new Tweet({
                tweetMessage: req.body.tweetMessage,
                tweetUser: tUser
            })
            try {
                const newTweet = await tweet.save()
                await tUser.tweetIDs.push(newTweet._id)
                tUser.save()
                res.status(201).json(newTweet)
            } catch(err) {
                res.status(400).json({message: err.message})
            }
        }
        else {
            let tUser = await User.findOne({userId: req.body.uId});
            const tweet = new Tweet({
                tweetMessage: req.body.tweetMessage,
                tweetUser: tUser
            })
            try {
                const newTweet = await tweet.save()
                await tUser.tweetIDs.push(newTweet._id)
                tUser.save()
                res.status(201).json(newTweet)
            } catch(err) {
                res.status(400).json({message: err.message})
            }
        }
    });
})

module.exports = router