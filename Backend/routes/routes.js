const express = require('express')
const router = express.Router();

const Registro = require('../models/registros');

router.get('/', async (req, res) => {
    const registros = await Registro.find()
    console.log(registros)
    res.json(registros)
})

router.post('/', async (req, res) => {
    const { id, ciudad, año, mes, dia, hora, indice } = req.body.body;
    console.log(req)
    const registro = new Registro({ id, ciudad, año, mes, dia, hora, indice })
    console.log(registro)
    await registro.save()
    res.json({ status: "Registro Guardado" })
})

module.exports = router;