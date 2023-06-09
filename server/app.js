'use strict'

const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000

const router = require('./routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})