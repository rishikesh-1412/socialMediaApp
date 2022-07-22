import React from 'react'

import './FollowersCard.css';

import { Followers } from '../../Data/FollowersData';
import User from '../User/User';

import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getAllUser } from '../../api/UserRequest';

const FollowersCard = () => {

    const { user } = useSelector((state) => state.authReducer.authData);
    const [people, setPeople] = useState([])

    useEffect(() => {
        const getPeoples = async () => {
            const { data } = await getAllUser();
            setPeople(data);
            // console.log(data);
        }
        getPeoples();
        // eslint-disable-next-line
    }, [])

  return (
    <div className='FollowersCard'>
        <h3>People you may know...</h3>
        {people.map((person,id)=>{
            if(person._id !== user._id){
                return(
                    <User person = {person} key={id}/>
                )
            }
        })}
    </div>
  )
}

export default FollowersCard