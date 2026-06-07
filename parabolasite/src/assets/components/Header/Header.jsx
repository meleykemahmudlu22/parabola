import React from 'react'
import { IoMdMenu } from "react-icons/io";
import "./header.css"
import { Link } from 'react-router-dom'

function Header  () {
  function menutoggle (){
    document.getElementById("menyu").classList.toggle("active")
  }
  return (
    <div className='Topcontainer'>
      <div className="headercontainer">
        <div className="parabolalogo">
            <h1>PARABOLA</h1>
        </div>
        <div className="parabolanavigation">
           <IoMdMenu onClick={menutoggle}className='menuicon' />
            <nav id='menyu'>
              
                <ul>
                 
                    <Link to="/">Katalog</Link>
                   <Link to="/register">Register</Link>
                   <Link to="/login">LogIn</Link>
                     {/* <Link to="/seller">Satıcı</Link> */}
                    <Link to="/profile">Profil</Link>
                   
                </ul>
            </nav>
        </div> 
      </div>
    </div>
  )
}

export default Header
