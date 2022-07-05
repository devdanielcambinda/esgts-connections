const express = require('express')
const Contacto = require('../models/contacto')

const router = new express.Router()

router.post('/', async (req,res) => {
    
    const contacto = Contacto.create({
        
    })
})

router.get

module.exports = router