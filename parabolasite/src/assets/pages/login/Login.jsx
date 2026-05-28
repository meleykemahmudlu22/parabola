import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginFailure, loginStart, loginSucces } from '../../../features/Login/LoginSlice'
import axios from 'axios'
import { notification } from "antd";
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header';
import "./login.css"

function Login  ()  {
const dispatch=useDispatch()
  const{loading,error}=useSelector((state)=>state.authlogin)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate=useNavigate()

  const handleLogin= async (e)=>{
    e.preventDefault()
    dispatch(loginStart())
 if(!email|| !password){
notification.error({
  message:"xeta",
  description:"email ve ya password bos ola bilmez"
})
return
 }
    try {
      let {data}= await axios.get("https://678e58c7a64c82aeb1200f8c.mockapi.io/new")
     const user= data.find(item=>item.email===email && item.password===password)
     if(user){
      dispatch(loginSucces(user))

      notification.success({
        message:"ugurlu oldu",
        description:`xos geldin ${user.email}`
      })
      navigate("/profile")
     }else{
      dispatch(loginFailure("email ve sifre yanlisdir"))
       notification.error({
      message: "Login uğursuz",
      description: "Email və ya şifrə səhvdir!"
    })
     }
    } catch (error) {
      dispatch(loginFailure(error.message))
      notification.error({
    message: "Server xətası",
    description: error.message
  })
    }
  }

  return (
 <>
      <Header />
      <div className='FormLoginContainer'>
        <form onSubmit={handleLogin}>
          <div className="FormLoginText">
            <h2>Log into Parabola</h2>
           
          </div>
          <div className="formLogindiv">
            <div className="LabelLoginForm">
              <label htmlFor="email">Email</label>
              <input
                id='email'
                autoComplete="off"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="LabelLoginForm">
              <label htmlFor="password">Password</label>
              <input
                id='password'
                autoComplete="new-password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="forgotpassword">
              <Link to="/forgot">
               <button>Forgot Password ?</button>
              </Link>
             
            </div>

            <div className="formbtn">
              <button type="submit" disabled={loading}>
                {loading ? "loading..." : "register"}
              </button>
            </div>
          
          <div className="createaccount">
            <Link to="/register">
             <button>Create New Account</button>
            </Link>
           
          </div>

           
          </div>

          {error && <p className="error-text">{error}</p>}
        </form>
      </div>
    </>
   
  )
}

export default Login
