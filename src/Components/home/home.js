import React, { useEffect, useState } from 'react'
import "./home.css"
import Axios from 'axios';

export default function Home() {

    const [tweetMess, setTweetMess] = useState("")
    const [tweetUser, setTweetUser] = useState("")
    const [tweetId, setTweetId] = useState("")
    const [userId, setUserId] = useState("")
    const [tweets, setTweets] = useState("")
    const [users, setUsers] = useState("")

    useEffect(() => {
        Axios.get("http://localhost:3001/tweets")
            .then((res) => {
                console.log(res.data.tweets)
                console.log(res.data.users)
                setTweets(res.data.tweets)
                setUsers(res.data.users)
            })
    }, []);

    const handleCreateTweet = (e) => {
        e.preventDefault();

        Axios.post(
            "http://localhost:3001/createTweet",
            {
                tweetMessage: tweetMess,
                uId: tweetUser
            }
        ).then(
            (res) => {
                console.log(res.data)
            }
        )

    };

    const handleGetTweet = (e) => {
        e.preventDefault();

        Axios.get(
            "http://localhost:3001/tweet/"+tweetId
        ).then(
            (res) => {
                console.log(res.data)
            }
        )
    };

    const handleGetTweetsByUser = (e) => {
        e.preventDefault();

        Axios.get(
            "http://localhost:3001/user/"+userId
        ).then(
            (res) => {
                console.log(res.data)
            }
        )
    };

    return (
        <div className='App'>
            <h1>
                Hello, Welcome to the homepage of myTwitter (a place for you).
            </h1>

            <div></div>

            <div>
                <div className='form'>
                    <form onSubmit={(e) => { handleCreateTweet(e) }} >
                        <h3>Create Tweet</h3>
                        <textarea name="tweetMessage" placeholder="Your tweet message" value={tweetMess} onChange={(e) => { setTweetMess(e.target.value) }} required />
                        <br />
                        <input type="text" name="uId" placeholder="Your username" value={tweetUser} onChange={(e) => { setTweetUser(e.target.value) }} required />
                        <br />
                        <button>Tweet</button>
                    </form>
                </div>

                <br />
                <div className='form'>
                    <form onSubmit={(e) => { handleGetTweet(e) }} >
                        <h3>Get tweet by ID</h3>
                        <input type="text" name="tweetId" placeholder="Tweet Id..." value={tweetId} onChange={(e) => { setTweetId(e.target.value) }} required />
                        <br />
                        <button>Get Tweet</button>
                    </form>
                </div>

                <br />
                <div className='form'>
                    <form onSubmit={(e) => { handleGetTweetsByUser(e) }} >
                        <h3>Get tweets of a user</h3>
                        <input type="text" name="userId" placeholder="User Id..." value={userId} onChange={(e) => { setUserId(e.target.value) }} required />
                        <br />
                        <button>Get Tweets</button>
                    </form>
                </div>

            </div>

            <ul>
                {tweets.length} '  ' 
                {users.length}
            </ul>

        </div>
    )
}
