import React from 'react'
import '../Assets/Styles/Header.css'
const Header = () => {
    return(
        <>
            <div className="wrapper-header">
                <div className="description-header">
                    <h1>Welcome to the Hackathon</h1>
                    <h3>Instructions</h3>
                    <p>
                        Into the project, there are some challenges that you need to complete as a team
                    </p>
                    
                </div>
                <div className="wrapper-logo">
                    <img className="wrapper-img"/>
                </div>
                
            </div>

        </>
    )
}

export default Header