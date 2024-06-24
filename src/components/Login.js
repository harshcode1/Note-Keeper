import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    let navigate = useNavigate();;
    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            // We will redirect 
            localStorage.setItem('token',json.authtoken)
            navigate("/")
            props.showAlert("You have SuccessFully Logged in","Yess")
        }else{
            // alert("Invalid")
            props.showAlert("Invalid details","Please Check again")
        }
    };


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <form className="container m-4" onSubmit={handleClick}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email"  onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name="password" onChange={onChange} id="password" />
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    )
}

export default Login
