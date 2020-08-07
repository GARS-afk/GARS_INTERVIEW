import React, {useState, useEffect} from 'react'
//Estilos
import '../Assets/Styles/Form.css'



const Form = () => {
    const [dataForm, setDataForm] = useState({})
    const handleChange = (event) => {
        
        setDataForm({
            ...dataForm,
            [event.target.name]: event.target.value
        })
    }
    return(
        <>
            <div className="wrapper-form">
                <h1>Orders Form</h1>
                <form className="card-form">
                    <span>Enterprise Name:</span>
                    <input type="text" onChange={handleChange} name="enterprise_name" placeholder="Enterprise Name"/>
                    <span>Address:</span>
                    <input type="text" onChange={handleChange} name="address" placeholder="Address"/>
                    <span>Email:</span>
                    <input type="email" onChange={handleChange} name="email" placeholder="Email"/>
                    <span>Enterprise key(RFC):</span>
                    <input type="text"onChange={handleChange} name="enterpriseKey" placeholder="Enterprise key(RFC)"/>
                    <span>Description:</span>
                    <textarea onChange={handleChange} name="description"/>
                    <div  className="button-form">Submit</div>
                </form>
            </div>
        </>
    )
}

export default Form