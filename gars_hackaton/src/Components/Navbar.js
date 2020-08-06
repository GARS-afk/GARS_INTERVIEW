import React from 'react'
import '../Assets/Styles/Navbar.css'

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar--logo">
               <span className="navbar--logo-span">IBM Interview</span>
            </div>
            <div className="navbar--wrapper">
                <ul className="navbar-ul">
                    <li className="navbar-ul-li"></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar