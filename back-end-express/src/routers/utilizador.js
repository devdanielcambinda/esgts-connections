const express = require('express')
const Utilizador = require('../models/utilizador')
const Perfil = require('../models/perfil')
const Login = require('../models/logins')

const router = new express.Router()

module.exports = router