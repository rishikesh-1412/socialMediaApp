import React from 'react'

import {useDispatch, useSelector} from 'react-redux'

import './Auth.css';

import Logo from '../../img/logo.png';
import { useState } from 'react';
import { logIn, signUp } from '../../actions/AuthActions';

const Auth = () => {
    
    const dispatch = useDispatch()

    const loading = useSelector((state)=>state.authReducer.loading);

    const [isRegistered,setIsRegistered] = useState(true);

    const [data,setData] = useState({
        firstname:"",
        lastname:"",
        username:"",
        password:"",
        confirmpass:""
    })

    const inputEvent = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setData({...data,[name]:value});
    }

    const submitEvent = (e)=>{
        e.preventDefault();
        if(isRegistered){
            if(data.password===data.confirmpass)dispatch(signUp(data));
        }else{
            dispatch(logIn(data));
        }
    }

    const resetForm = ()=>{
        setData({
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            confirmpass: ""
        });
    }

  return (
    <div className='Auth'>
        <div className='a-left'>
            <img src={Logo} alt=""/>
            <div className='Webname'>
                <h1>SocialBook</h1>
                <h6>Share your thoughts with world</h6>
            </div>
        </div>
        <div className='a-right'>
            <form className='infoForm authForm' onSubmit={submitEvent}>
                <h3>{isRegistered?"Sign up":"Login"}</h3>

                {isRegistered ?
                    <div>
                        <input type="text" placeholder='First Name' className='infoInput' name='firstname'onChange={inputEvent} value={data.firstname}/>
                        <input type="text" placeholder='Last Name' className='infoInput' name='lastname' onChange={inputEvent} value={data.lastname}/>
                    </div>
                :null}

                <div>
                    <input type="text" className='infoInput' name='username' placeholder='Username'onChange={inputEvent} value={data.username}/>
                </div>
                <div>
                    <input type="password" className='infoInput' name='password' placeholder='Password'onChange={inputEvent} value={data.password}/>
                    {isRegistered?<input type="password" className='infoInput' name='confirmpass' placeholder='Confirm Password'onChange={inputEvent} value={data.confirmpass}/>:null}
                </div>

                {data.confirmpass!==""?
                    (data.confirmpass===data.password)?
                    <spam style={{color:"green",fontSize:"12px"}}>
                        *Confirm password and password are matching.
                    </spam>:
                    <spam style={{color:"red",fontSize:"12px"}}>
                        *Confirm password and password are not matching.
                    </spam>:
                null}

                <div>
                    <span style={{ fontSize: "12px",cursor:"pointer" }} onClick={()=>{setIsRegistered(!isRegistered);resetForm()}}>
                        {isRegistered?"Already have an account? Login.":"Don't have an account? Signup."}
                    </span>
                </div>
                <button className='button infoButton' type="submit" disabled={loading}>{loading?"Loading...":isRegistered?"Signup":"Login"}</button>
            </form>
        </div>
    </div>
  )
}

export default Auth