import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/noteContext';

const SignUp = () => {
    const {showAlert}=useContext(NoteContext);
    const [details, setDetails] = useState({ name: "", email: "", password: "",cpassword:"" });
    const navigate=useNavigate();
    const onChange = (e) => {
        e.preventDefault();
        setDetails({ ...details, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password,cpassword}=details;
        if(password===cpassword){
            const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name,email,password })
            })
    
            const json = await response.json();
            if(json.success){
                localStorage.setItem("token",json.authtoken);
                navigate("/");
                showAlert("Sign UP SuccessFully","success");
            }else{
                showAlert("Invalid Credentials","danger");
            }
        }
        else{
            showAlert("Password and Confirm Password must be same","danger");
        }
    }
    return (
        <div className='container w-50'>
            <form onSubmit={handleSubmit}>
                <div className="mt-5 mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onChange={onChange} id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" onChange={onChange} id="cpassword" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
