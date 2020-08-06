import React from 'react'
//Componentes
import Navbar from '../Components/Navbar'
import Form from '../Components/Form'

const Home = () => {
    return(
        <>
            <Navbar />
            <div className="wrapper-main-section">
                <Form />
            </div>
        </>

    )
}

export default Home