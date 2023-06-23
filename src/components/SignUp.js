import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""}) 
  let navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credentials
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password})
    });
    const json = await response.json()
    console.log(json);
    if (json.success){
        // Save the auth token and redirect
        localStorage.setItem('token', json.authtoken); 
        navigate("/");

    }
    else{
        alert("Invalid credentials");
    }
}

const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}
  return (
    <>
      <div className="container">
        <form  onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              onChange={onChange}
              id="name"
              name="name"
              aria-describedby="emailHelp"
              required
              // placeholder="Enter Name"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              onChange={onChange}
              id="email"
              name="email"
              aria-describedby="emailHelp"
              required
              // placeholder="Enter email"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              onChange={onChange}
              id="password"
              name="password"
              minLength={5}
              required
              // placeholder="Password"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              onChange={onChange}
              id="cpassword"
              name="cpassword"
              minLength={5}
              required
              // placeholder="Confirm Password"
            />
          </div>
          <button type="submit" className="btn btn-primary mb-3">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
