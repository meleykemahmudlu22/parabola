import React from 'react'
import "./header.css"

const Header = () => {
  return (
    <div>
      <div className="headercontainer">
        <div className="parabolalogo">
            <h1>PARABOLA</h1>
        </div>
        <div className="parabolanavigation">
            <nav>
                <ul>
                    <li>Katalog</li>
                    <li>Register</li>
                    <li>LogIn</li>
                    <li>Satıcı</li>
                </ul>
            </nav>
        </div>
      </div>
    </div>
  )
}

export default Header
