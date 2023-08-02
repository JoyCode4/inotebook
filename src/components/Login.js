import React, { useState,useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import NoteContext from '../context/notes/noteContext';
// us useNavigate instead of the useHistory
const Login = () => {
    const {showAlert}=useContext(NoteContext);
    const [credentials,setCredentials]=useState({email:"",password:""});
    const navigate=useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch(`https://inotebook-backend-lfmh.onrender.com/api/auth/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:credentials.email,
                password:credentials.password,
            })
        })
        const json=await response.json();
        // console.log(json);
        if(json.success){
            // Save the auth token and redirect
            localStorage.setItem("token",json.authtoken);
            navigate("/");
            showAlert("Login SuccessFully","success");
        }else{
            // alert("Invalid Credentials");
            showAlert("Invalid Credentials","danger");
        }
    }

    const onChange=(e)=>{
        e.preventDefault();
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }
  return (
    <div className='container w-50'>
      <form onSubmit={handleSubmit}>
            <div className="mt-5 mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="password"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Login
