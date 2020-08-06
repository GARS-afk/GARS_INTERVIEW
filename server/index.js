const express = require('express')
require('dotenv').config()
const ibm_db = require('ibm_db')
const app = express()

app.listen( process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${ process.env.PORT }`)
  })