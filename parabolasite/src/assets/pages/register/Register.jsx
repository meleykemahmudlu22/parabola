import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { notification } from "antd";
import { registerFailure, registerStart, registerSucces } from '../../../features/Register/RegisterSlice'
import { useNavigate } from 'react-router-dom';

function Register() {
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.auth)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
const navigate=useNavigate()
 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/

  const handleRegister = async (e) => {
    e.preventDefault()

    
    if (!emailRegex.test(email)) {
      notification.error({
        title: "Email düzgün deyil",
        description: "Zəhmət olmasa düzgün email daxil edin!"
      })
      return
    }

  
    if (!passwordRegex.test(password)) {
      notification.warning({
        title: "Şifrə zəifdir",
        description: "Şifrə minimum 8 simvol, böyük/kiçik hərf, rəqəm və xüsusi simvol içerməlidir!"
      })
      return
    }

    dispatch(registerStart())
    try {
      let { data } = await axios.post(
        "https://678e58c7a64c82aeb1200f8c.mockapi.io/new",
        { email, password }
      )
      dispatch(registerSucces(data))

      notification.success({
        title: "Qeydiyyat uğurlu oldu ",
        description: `İstifadəçi ${data.email} əlavə edildi`
      })
      setEmail("");
    setPassword("");
      setTimeout(()=>{
        navigate("/login")
      },2000)
    } catch (error) {
      dispatch(registerFailure(error.message))
      notification.error({
        title: "Xəta baş verdi ",
        description: error.message
      })
    }
  }

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input autoComplete="off" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input autoComplete="new-password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" disabled={loading}>Register</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}

export default Register
