import React from 'react'
import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { followUser, unFollowUser } from '../../actions/userActions'
const User = ({person}) => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.authReducer.authData);
    const [followed,setFollowed] = useState(person.followers.includes(user._id));
    const followEvent = (e)=>{
        e.preventDefault();
        followed ? dispatch(unFollowUser(person._id, user)):
        dispatch(followUser(person._id,user))

        setFollowed(!followed);
    }

    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  return (
      <div className='follower'>
          <div>
              <img src={person.profilePicture ? serverPublic + person.profilePicture : serverPublic + "defaultPicture.jpg"} alt="" className='followerImg' />
              <div className='name'>
                  <span>{person.firstname} {person.lastname}</span>
                  <span>@{person.username}</span>
              </div>
          </div>
          <button className={followed ? 'button fc-button btn-unfollow' :"button fc-button"} onClick={followEvent}>{followed ? "Unfollow":"Follow"}</button>
      </div>
  )
}

export default User