import React, {useState, useEffect} from 'react'
//Estilos
import '../Assets/Styles/Form.css'



const Form = () => {
    const [dataForm, setDataForm] = useState({})
    const handleChange = (event) => {
        
        setDataForm({
            ...dataForm,
            id_random:  Math.floor(Math.random() * 1000),
            [event.target.name]: event.target.value
        })

        console.log(dataForm)
    }

    const submitEvent = async () => {
        /*
            Aqui deben de crear el codigo para poder enviar la informacion a la base de datos haciendo la validación
            de que ningun campo este vacio
        */
       console.log(dataForm)

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
            console.log(res)
       }
       catch(err){
           console.log(err)
       }
       
       
    }
    return(
        <>
            <div className="wrapper-form">
                <h1>Orders Form</h1>
                <form className="card-form">
                    <span>Enterprise Name:</span>
                    <input 
                        type="text" 
                        onChange={handleChange} 
                        name="enterprise_name" 
                        placeholder="Enterprise Name"/>
                    <span>Address:</span>
                    <input 
                        type="text" 
                        onChange={handleChange} 
                        name="address" 
                        placeholder="Address"/>
                    <span>Email:</span>
                    <input 
                        type="email" 
                        onChange={handleChange} 
                        name="email" 
                        placeholder="Email"/>
                    <span>Enterprise key(RFC):</span>
                    <input 
                        type="text" 
                        onChange={handleChange} 
                        name="enterprise_key" 
                        placeholder="Enterprise key(RFC)"/>
                    <span>Description:</span>
                    <textarea 
                        onChange={handleChange} 
                        name="description"/>
                    <div  className="button-form" onClick={submitEvent}>Submit</div>
                </form>
            </div>
        </>
    )
}

export default Form