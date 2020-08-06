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

app.post('/newOrder', ( req, res ) => {
    ibm_db.open(process.env.DB, ( err, con ) => {
        if( err ) {
            res.status(500).json({
                mensaje: 'Error al intentar concectar con la DB',
                error: err
            })
        }
        else {
            con.query(/* aqui deben colocar el query para insertar los datos que vienen del front*/'', ( err, data ) => {
                if( err ) {
                    res.status(500).json({
                        mensaje: 'Error al ejecutar el query' ,
                        error: err
                    })
                }
                else {
                    res.status(200).json({
                        mensaje: 'nueva orden registrada'
                    })
                }
            })
        }
    })
})

app.put('/statusOrder', ( req, res ) =>{
    ibm_db.open(process.env.DB, (err, con) => {
        if( err ) {
            res.status(500).json({
                mensaje:'Error Conectarse a la db',
                error: err
            })
        }
        else {
            con.query(`UPDATE JFV11323.ORDERS SET STATUS = '${ req.STATUS }' WHERE ID_ORDER = ${req.ID_ORDER}`, (err, data) => {
                if( err ) {
                    res.status(500).json({
                        mensaje:'Error ejecutar el query',
                        error: err
                    })
                }
                else {
                    res.status(200).json({
                        mensaje: 'Status actualizado',
                        data: data
                    })
                }
            })
        }
    })
})

app.delete('/deleteOrder', (req, res) => {
    ibm_db.open(process.env.DB, (err, con) => {
        if( err ) {
            res.status(500).json({
                mensaje:'Error Conectarse a la db',
                error: err
            })
        }
        else {
            con.query(`DELETE * FROM JFV11323 WHERE ID_ORDER = ${ req.ID_ORDER }`, (err, data) => {
                if( err ) {
                    res.status(500).json({
                        mensaje:'Error ejecutar el query',
                        error: err
                    })
                }
                else {
                    res.status(200).json({
                        mensaje: 'Opcion eliminada',
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