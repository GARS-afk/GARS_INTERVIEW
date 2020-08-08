import React, { useState, useEffect } from 'react'
//Componentes
import Navbar from '../Components/Navbar'
import Form from '../Components/Form'
import Header from '../Components/Header'
import Cards from '../Components/Cards'
//styles
import '../Assets/Styles/home.css'

const Home = () => {

    const [dataCard, setDataCard] = useState([])

    useEffect(() => {
        fetch('/orders')
        .then(res => res.json())
        .then(data => {
            setDataCard(data.data)
        })
    }, [])


    return(
        <>
            <Navbar />
            <Header />
            <div className="wrapper-main-section">
                <Form />
                <Cards dataCard={dataCard} />
            </div>
        </>

    )
}

export default Home