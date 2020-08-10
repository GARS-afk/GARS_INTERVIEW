import React from 'react'

//Componentes
import Card from './Card'
//estilos
import '../Assets/Styles/Cards.css'

const Cards = (props) => {
    const {dataCard} = props
    return (
        <>
            <div className="wrapper-cards">
                <h1>Pending orders</h1>
               <div className="cards-container">
                   {
                      dataCard ? dataCard?.map(item => 
                            <Card {...item} key={item.ID_ORDER} rejectOrder={props.rejectOrder} acceptCard={props.acceptCard}/>
                        )
                        : <h1>No cards</h1>
                   }
               </div>
            </div>
        </>
    )
}

export default Cards