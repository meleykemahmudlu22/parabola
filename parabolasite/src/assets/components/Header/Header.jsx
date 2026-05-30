import React from 'react'
import "./header.css"
import { Link } from 'react-router-dom'

function Header  ()  {
  return (
    <div className='Topcontainer'>
      <div className="headercontainer">
        <div className="parabolalogo">
            <h1>PARABOLA</h1>
        </div>
        <div className="parabolanavigation">
            <nav>
                <ul>
                    <li>Katalog</li>
                   <Link to="/register">Register</Link>
                    <li>LogIn</li>
                    <li>Satıcı</li>
                    <Link to="/profile">Profile</Link>
                   
                </ul>
            </nav>
        </div>
      </div>
    </div>
  )
}

export default Header
