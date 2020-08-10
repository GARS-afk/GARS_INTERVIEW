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

    const acceptCard = async (id_random) => {
        let data = {
            ID_ORDER: id_random,
            STATUS: 'accept'
        }
        try {
            let res = await fetch('/statusOrder', {
                method:'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            getData()
        }
        catch(error) {
            console.log(error)
        }
    }

    const handleChange = (event) => {
        setDataForm({
            ...dataForm,
            // id_random: Descomentar e ingresar el codigo que genere un nuemero aleatorio,
            [event.target.name]: event.target.value
        })
    }

    const getData = async () => {
        fetch('/orders')
        .then(res => res.json())
        .then(data => {
            setDataCard(data.data)
        })
    }

    const rejectOrder = async ( orderId ) =>{
        try{
            let body = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    ID_ORDER: orderId,
                    STATUS: 'reject'
                })
            }
            fetch('/statusOrder', body)
            .then(res => res.json() )
            .then( data => {
                console.log(data)
                getData()
            })
        }
        catch(error){
            console.log(error)
        }
       
    } 

    const submitEvent = async () => {
        /*
            Aqui deben de crear el codigo para poder enviar la informacion a la base de datos haciendo la validación
            de que ningun campo este vacio
        */ 
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
                <Cards dataCard={dataCard} acceptCard={acceptCard} rejectOrder={rejectOrder}/>
            </div>
        </>

    )
}

export default Home