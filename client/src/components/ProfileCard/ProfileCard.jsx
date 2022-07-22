import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

// import Cover from '../../img/cover.jpg';
// import Profile from '../../img/profileImg.jpg';

import './ProfileCard.css';

const ProfileCard = ({location}) => {

     const {user} = useSelector((state)=>state.authReducer.authData)
    //  console.log(user);
     const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

     const ProfilePage = (location==="profilePage"?true:false);

    const [postCount,setPostCount] = useState(0);
    const getPostCount = async (req, res) => {
        try {
            const res = await fetch(`/post/count/${user._id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            setPostCount(data)
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
        getPostCount();
    })

  return (
    <div className='ProfileCard'>
        <div className='ProfileImages'>
            <img src={user.coverPicture?serverPublic + user.coverPicture : serverPublic + "defaultCover.jpg"} alt=""/>
            <img src={user.profilePicture?serverPublic + user.profilePicture : serverPublic + "defaultPicture.jpg"} alt=""/>
        </div>

        <div className='ProfileName'>
            <span>{user.firstname} {user.lastname}</span>
            <span>{user.worksAt ? user.worksAt : "Write about yourself..."}</span>
        </div>

        <div className='followStatus'>
            <hr/>
            <div>
                <div className='follow'>
                    <span>{user.followings.length}</span>
                    <span>Followings</span>
                </div>
                <div className='vl'></div>
                <div className='follow'>
                    <span>{user.followers.length}</span>
                    <span>Followers</span>
                </div>
                {ProfilePage && (
                    <>
                        <div className="vl">

                        </div>
                        <div className='follow'>
                            <span>{postCount}</span>
                            <span>Posts</span>
                        </div>
                    </>
                )}
            </div>
            <hr/>
        </div>
        {ProfilePage ? ('') : (
            <span>
                <Link style={{textDecoration:"none",color:"inherit"}} to={`/profile/${user._id}`}> My Profile </Link>
            </span>
        )}
    </div>
  )
}

export default ProfileCard