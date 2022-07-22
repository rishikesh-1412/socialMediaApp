import React from 'react'

import './Post.css';

import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { disLikePost, likePost } from '../../api/PostRequest';
import axios from 'axios';
import { useEffect } from 'react';

const Post = ({data}) => {
    // console.log(data);
    const {user} = useSelector((state)=>state.authReducer.authData)

    const [like, setLike] = useState(data.likes.includes(user._id));
    // console.log(user);
    const [totLikes, setTotLikes] = useState(data.likes.length);
    const [commenter,setCommenter] = useState("");
    const getCertainUser = async()=>{
        axios.get(`/user/${data.userId}`).then((res) => {
            if (res.status === 200 || res.status === 403) {
               setCommenter(res.data.username);
            //    console.log(commenter);
            }
        })
    }

    const getPost = async()=>{
        // e.preventDefault();
        axios.get(`/post/${data._id}`).then((res)=>{
            if(res.status === 200 || res.status === 403){
                // const tmp = res.json()
                // console.log(res.data);
                setLike(res.data.likes.includes(user._id))
                setTotLikes(res.data.likes.length)
                // console.log(like);
            }
        })
    }

    useEffect(()=>{
        getPost();
        getCertainUser();
        // eslint-disable-next-line
    },[]);

    const handleLike = ()=>{
        setLike((prev)=>!prev);
        like?disLikePost(data._id,user._id):likePost(data._id,user._id);
        like?setTotLikes((prev)=>prev-1):setTotLikes((prev)=>prev+1);
    }

  return (
    <div className="Post">
        <img src={data.image? process.env.REACT_APP_PUBLIC_FOLDER + data.image:""} alt=""/>
        <div className="postReact">
            <img src={like?Heart:NotLike} alt="" style={{cursor:"pointer"}} onClick={handleLike}/>
            <img src={Comment} alt="" />
            <img src={Share} alt="" />
        </div>

        <span style={{color:"var(--gray)",fontSize:'12px'}}>
            {totLikes} likes
        </span>

        <div className='detail'>
            <span>
                <b>{commenter}</b>
            </span>
            <span>
                &nbsp; {data.desc}
            </span>
        </div>
    </div>
  )
}

export default Post