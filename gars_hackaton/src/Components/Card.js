import React from 'react'

//Estilos
import '../Assets/Styles/Card.css'

const Card = (props) => {
    const info = props
    return (
        <>
            <div className="wrapper-card-info">
                <h3>{info.ENTERPRISE_NAME}</h3>
                <div className="card-description">
                <span>{info.ADDRESS}</span>
                <span>{info.EMAIL}</span>
                <span>{info.ENTERPRISE_KEY}</span>
                <span>{info.DESCRIPTION}</span>
                <span>{info.STATUS}</span>
                </div>
                <div className="wrapper-button">
                    <div className="button-accept" onClick={() => props.acceptCard(info.ID_ORDER)}>Accept</div>
                    <div className="button-reject button-cancel">Reject</div>
                </div>
            </div>
        </>
    )
}

export default Card