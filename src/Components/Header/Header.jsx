import React, { useState } from 'react'
import {Link, NavLink} from "react-router-dom";
import "./Header.css";


function Header() {

    const [menuOpen, setMenuOpen] = useState(false);


  return (
    <>
        <nav className='z-50'>
            <Link to={"/"} className='title'>Bloger Spot</Link>
            <div onClick={()=>setMenuOpen(!menuOpen)} className='menu'>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
                <li><NavLink to={"/"}>Home</NavLink></li>
                <li><NavLink to={"/myblogs"}>My Blogs</NavLink></li>
                <li><NavLink to={"/create"}>Create</NavLink></li>
                <li><NavLink to={"/profile"}>Profile</NavLink></li>
            </ul>
        </nav>
    </>
  )
}

export default Header