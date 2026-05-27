import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginFailure, loginStart, loginSucces } from '../../../features/Login/LoginSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login  ()  {
const dispatch=useDispatch()
  const[loadin,error]=useSelector((state)=>state.authlogin)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate=useNavigate()

  const hanleLogin= async (e)=>{
    e.preventDefault()
    dispatch(loginStart())

    try {
      let {data}= await axios.get("https://678e58c7a64c82aeb1200f8c.mockapi.io/new")
     const user= data.find(item=>item.email===email && item.password===password)
     if(user){
      dispatch(loginSucces(user))
      navigate("/profile")
     }else{
      dispatch(loginFailure("email ve sifre yanlisdir.00"))
     }
    } catch (error) {
      dispatch(loginFailure(error.message))
    }
  }

  return (
    <div>
    
    </div>
  )
}

export default Login
