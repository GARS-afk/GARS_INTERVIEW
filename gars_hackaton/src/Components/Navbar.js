import React from 'react'
import '../Assets/Styles/Navbar.css'
import { Bee32, IbmCloud32, Watson32 } from '@carbon/icons-react'
const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar--logo">
                <Bee32 />
                <span className="navbar--logo-span">IBM Interview</span>
            </div>
            <div className="navbar--wrapper">
                <ul className="navbar-ul">
                    IBM Cloud
                    <li className="navbar-ul-li">
                        <a href="https://cloud.ibm.com/" target="_blank">
                            <IbmCloud32 color="white"/>
                        </a>
                    </li>
                    IBM Watson
                    <li className="navbar-ul-li">
                        <a href="https://www.ibm.com/mx-es/watson" target="_blank">
                            <Watson32 color="white"/>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar