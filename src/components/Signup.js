import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"", email: "", password: "",cpassword:"" })

    let navigate = useNavigate();;
    const handleClick = async (e) => {
        const {name,email,password,cpassword} = credentials;
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name,email,password,cpassword }),
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            // We will redirect 
            localStorage.setItem('token',json.authtoken)
            navigate("/")
            props.showAlert("Success","Account Created")
        }else{
            // alert("Invalid")
            props.showAlert("Failure","Account not created")
        }
    };


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <form className="container m-4" onSubmit={handleClick}>
        <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="name" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="password" required minLength={5}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" name="cpassword" value={credentials.cpassword} onChange={onChange} id="password"  required minLength={5}/>
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    )
}

export default Signup

