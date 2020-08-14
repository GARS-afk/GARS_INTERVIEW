import React, { useState, useEffect } from 'react'
import axios from 'axios';
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
            await fetch('/statusOrder', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            getData()
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleChange = (event) => {
        // let enterpriseKey = event.target.name === "enterprise_name" ? event.target.value.substring(0,2) + ("" + Math.random()).substring(2,8) : ''
        setDataForm({
            ...dataForm,
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

    const rejectOrder = async (orderId) => {
        try {
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
                .then(res => res.json())
                .then(data => {
                    getData()
                })
        }
        catch (error) {
            console.log(error)
        }

    }

    const submitEvent = () => {
        /*
            Aqui deben de crear el codigo para poder enviar la informacion a la base de datos haciendo la validación
            de que ningun campo este vacio
        */
        if ((Object.keys(dataForm)).length < 4) {
            alert("You must fill all the fields first")
            return
        }
        for (const key in dataForm) {
            if (key === "enterprise_name" && dataForm[key].length < 3) {
                alert("Enterprise name must be at least 3 characters long")
                return
            }
            if (dataForm[key].length === 0) {
                alert("Please, fill all the fields")
                return
            }
        }
        const { enterprise_name } = dataForm;
        let enterpriseKey = enterprise_name.substring(0,3) + ("" + Math.random()).substring(2, 8);
        let data = {
            ...dataForm,
            enterpriseKey
        }
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
        axios.post('/newOrder', data, config)
            .then(res => getData())
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <>
            <Navbar />
            <Header />
            <div className="wrapper-main-section">
                <Form submitEvent={submitEvent} handleChange={handleChange} />
                <Cards dataCard={dataCard} acceptCard={acceptCard} rejectOrder={rejectOrder} />
            </div>
        </>

    )
}

export default Home