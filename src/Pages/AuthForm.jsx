import React from "react";
import img from "../assets/images/truck.jpeg";
import "../Css/Authform.css";
import { jwtDecode } from "jwt-decode";

export default function AuthForm() {
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try{
      const response=await fetch("http://localhost:8081/auth/login",{
      method:"POST",  
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },  
      body:JSON.stringify({email,password})
    });
    const data=await response.json();
    console.log(data);
    if(response.ok &&data.token){
      alert("Login Successful");
      localStorage.setItem("token",data.token);
      window.location.href="/homepage";
      const decode = jwtDecode(data.token);
      console.log("Decode token: ", decode);
      localStorage.setItem("user",JSON.stringify(decode));
      console.log("User data: ", decode.userId);
    }
    else{
      alert(data.message|| "Invalid credentials");
    }
    
    console.log("Login attempt:", { email, password });
    }
    catch(error){
      console.error("Login error",error);
      alert("Something went wrong !!! ");
    }

   
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <img className="truck-image" src={img} alt="Truck" />
      </div>

      <div className="auth-right">
        <div className="auth-title">XPACE</div>

        <div className="form-wrapper">
          <form onSubmit={handleLoginSubmit} id="loginForm" className="form">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="form-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="form-input"
            />
            <button type="submit" className="submit-btn">
              Log In
            </button>
            <div className="forgot-text">
              <a href="#" className="forgot-link">
                Forgot password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
