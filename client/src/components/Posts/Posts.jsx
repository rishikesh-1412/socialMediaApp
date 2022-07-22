import React from 'react'

import "./Posts.css";

import Post from '../Post/Post';


import {useSelector} from "react-redux";
import { useEffect } from 'react';
// import { getTimelinePosts } from '../../actions/postActions';
// import axios from 'axios';
import { useState } from 'react';

const Posts = ({location}) => {
  
  // const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.authReducer.authData);
  // const {posts,loading} = useSelector((state)=>state.postReducer);
  const [allPosts,setAllPosts] = useState([]);
// console.log(loading);
  const gettingPosts = async (req, res) => {
    try {
      const res = await fetch(`/post/${user._id}/timeline`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await res.json();
      setAllPosts(data)
      // console.log(allPosts);
      if (res.status !== 200) {
        // window.alert("1")
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log("Error: " + error)
    }
  }

  useEffect(()=>{
    gettingPosts();
    // dispatch(getTimelinePosts(user._id));
  });

  return (
    <div className="Posts">
        {allPosts.map((post, id) => {
          // console.log(post);
          return location==="profilePage"?(post.userId === user._id ? <Post data={post} id={id} />:null):
            <Post data={post} id={id} />
          
        })}
    </div>
  )
}

export default Posts