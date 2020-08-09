import React, {useState, useEffect} from 'react'
//Estilos
import '../Assets/Styles/Form.css'



const Form = (props) => {
    return(
        <>
            <div className="wrapper-form">
                <h1>Orders Form</h1>
                <form className="card-form">
                    <span>Enterprise Name:</span>
                    <input 
                        type="text" 
                        onChange={props.handleChange} 
                        name="enterprise_name" 
                        placeholder="Enterprise Name"/>
                    <span>Address:</span>
                    <input 
                        type="text" 
                        onChange={props.handleChange} 
                        name="address" 
                        placeholder="Address"/>
                    <span>Email:</span>
                    <input 
                        type="email" 
                        onChange={props.handleChange} 
                        name="email" 
                        placeholder="Email"/>
                    <span>Enterprise key(RFC):</span>
                    <input 
                        type="text" 
                        onChange={props.handleChange} 
                        name="enterpriseKey" 
                        placeholder="Enterprise key(RFC)"/>
                    <span>Description:</span>
                    <textarea 
                        onChange={props.handleChange} 
                        name="description"/>
                    <div  className="button-form" onClick={props.submitEvent}>Submit</div>
                </form>
            </div>
        </>
    )
}

export default Form