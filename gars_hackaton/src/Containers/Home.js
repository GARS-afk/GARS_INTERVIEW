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
    const [dataForm, setDataForm] = useState({})

    const handleChange = (event) => {
        
        setDataForm({
            ...dataForm,
            id_random: Math.floor(Math.random() * 1000),
            [event.target.name]: event.target.value
        })
        console.log(dataForm)
    }

    const getData = async () => {
        fetch('/orders')
        .then(res => res.json())
        .then(data => {
            setDataCard(data.data)
        })
    }

    const submitEvent = async () => {
        /*
            Aqui deben de crear el codigo para poder enviar la informacion a la base de datos haciendo la validación
            de que ningun campo este vacio
        */ 

       try {
            let res = await fetch('newOrder/', {
                method: 'POST',
                body: JSON.stringify(dataForm),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            alert('Sin problemas')
            getData()
            setDataForm({})
       }
       catch(err){
           console.log(err)
       }
    }

    useEffect(() => {
        getData()
    }, [])


    return(
        <>
            <Navbar />
            <Header />
            <div className="wrapper-main-section">
                <Form submitEvent={submitEvent} handleChange={handleChange}/>
                <Cards dataCard={dataCard} />
            </div>
        </>

    )
}

export default Home