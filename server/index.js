const express = require('express')
require('dotenv').config()
const ibm_db = require('ibm_db')
const app = express()

app.get('/orders', (req, res) => {
    ibm_db.open(process.env.DB, ( err, con ) => {
        if( err ) {
            res.status(500).json({
                mensaje: 'Error al intentar concectar con la DB',
                error: err
            })
        }
        else {
            con.query('SELECT * FROM JFV11323.ORDERS', (err, data) => {
                if( err ) {
                    res.status(500).json({
                        mensaje:'Error al ejecutar el query',
                        error: err
                    })
                }
                else {
                    res.status(200).json({
                        mensaje: 'Consulta realizada con exito',
                        data: data
                    })
                }
            })
        }
    })
})

app.listen( process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${ process.env.PORT }`)
  })