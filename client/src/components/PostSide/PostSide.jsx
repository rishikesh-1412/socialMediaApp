import React from 'react'

import "./PostSide.css";

import Posts from '../Posts/Posts';
import PostShare from '../PostShare/PostShare';

const PostSide = ({location}) => {
  return (
    <div className='PostSide'>
        <PostShare/>
        <Posts location = {location}/>
    </div>
  )
}

export default PostSide