import React from 'react'
//Componentes
import Navbar from '../Components/Navbar'
import Form from '../Components/Form'
import Header from '../Components/Header'
//styles
import '../Assets/Styles/home.css'

const Home = () => {
    return(
        <>
            <Navbar />
            <Header />
            <div className="wrapper-main-section">
                <Form />
            </div>
        </>

    )
}

export default Home