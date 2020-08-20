const express = require('express')
require('dotenv').config()
const ibm_db = require('ibm_db')
const app = express()
const cors = require('cors')

const ibm_variable_temp = 'DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-14.services.dal.bluemix.net;PORT=50001;PROTOCOL=TCPIP;UID=qks86401;PWD=0j2z3xk+rxg9hn5x;Security=SSL;'

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')

    res.header('Access-Control-Allow-Header', 'Origin', 'X-Request-With', 'Content-Type', 'Accept')
    next()

    app.options('*', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET, POST')
        res.send()
    })
})
app.post('/newUser', (req, res) => {
    console.log(req.body)

    const {
        id_random = Math.floor(Math.random() * 3600000),
        nombre,
        apellidos,
        username,
        password,
    } = req.body 

    ibm_db.open(ibm_variable_temp, (err, conn) => {
        if (err) return res.status(500).json({message: 'Error in connection'})

        conn.query(`INSERT INTO QKS86401.USERS  VALUES ('${id_random}', '${nombre}', '${apellidos}', '${username}', '${password}');`, (err, data) => {
            err 
            ? res.json({message: `Error in connection ${err}`})
            : res.json({message: 'New user inserted'})
            ibm_db.close()
        })
    })
})

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
                    con.close();
                }
                else {
                    res.status(200).json({
                        mensaje: 'Consulta realizada con exito',
                        data: data
                    }) 
                    con.close()
                }
            })
        }
    })
})

app.post('/newOrder', ( req, res ) => {
     //let id_random: Descomentar e ingresar el codigo que genere un nuemero aleatorio,
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
                    con.close();
                }
                else {
                    res.status(200).json({
                        mensaje: 'nueva orden registrada'
                    })
                    con.close();
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
            con.query(`UPDATE JFV11323.ORDERS SET STATUS = '${ req.body.STATUS }' WHERE ID_ORDER = ${req.body.ID_ORDER}`, (err, data) => {
                if( err ) {
                    res.status(500).json({
                        mensaje:'Error ejecutar el query',
                        error: err
                    })
                    con.close();
                }
                else {
                    res.status(200).json({
                        mensaje: 'Status actualizado',
                        data: data
                    })
                    con.close();
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
            con.query(`DELETE * FROM JFV11323 WHERE ID_ORDER = ${ req.body.ID_ORDER }`, (err, data) => {
                if( err ) {
                    res.status(500).json({
                        mensaje:'Error ejecutar el query',
                        error: err
                    })
                    con.close();
                }
                else {
                    res.status(200).json({
                        mensaje: 'Opcion eliminada',
                        data: data
                    })
                    con.close();
                }
            })
        }
    })
})

app.listen( process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${ process.env.PORT }`)
  })