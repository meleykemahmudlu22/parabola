import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginFailure, loginStart, loginSucces } from '../../../features/Login/LoginSlice'
import axios from 'axios'
import { notification } from "antd";
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header';
import "./login.css"
import { BASE_URL } from '../../config'  

function Login() {
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.authlogin)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(loginStart())

    if (!email || !password) {
      notification.error({
        message: "Xəta",
        description: "Email və ya şifrə boş ola bilməz!"
      })
      return
    }

    try {
      
      let { data } = await axios.post(`${BASE_URL}/login`, { email, password })

      if (data && data.email) {
        dispatch(loginSucces(data))

        notification.success({
          message: "Uğurlu oldu",
          description: `Xoş gəldin ${data.email}`
        })

        navigate("/profile")
      } else {
        dispatch(loginFailure("Email və şifrə yanlışdır"))
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
                <button type="button">Forgot Password ?</button>
              </Link>
            </div>

            <div className="formbtn">
              <button type="submit" disabled={loading}>
                {loading ? "loading..." : "Login"}
              </button>
            </div>

            <div className="createaccount">
              <Link to="/register">
                <button type="button">Create New Account</button>
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
