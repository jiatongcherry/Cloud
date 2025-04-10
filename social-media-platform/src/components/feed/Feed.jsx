import React, { useState, useEffect } from 'react'
import './feed.css'
import Share from '../share/Share'
import Post from '../post/Post'
import axios from 'axios'

const Feed = ({ username, userId }) => {
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await axios.get('/api/posts/profile/' + username);
  //     setPosts(res.data);
  //   }
  //   fetchPosts();
  // }, [username]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let url;
        if (username) {
          url = `/api/posts/profile/${username}`;
        } else if (userId) {
          url = `/api/posts/timeline/${userId}`;
        }

        if (url) {
          const response = await axios.get(url);
          setPosts(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, [username, userId]);

  return (
    <div className='feed'>
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  )
}

export default Feed;
