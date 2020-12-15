const mongoose = require('mongoose');
const { Schema } = mongoose

const RegistrosSchema = new Schema({
    id: { type: Number, require: true },
    ciudad: { type: String, require: true },
    año: { type: Number, require: true },
    mes: { type: String, require: true },
    dia: { type: String, require: true },
    hora: { type: String, require: true },
    indice: { type: Number, require: true }
});

module.exports = mongoose.model('Registro', RegistrosSchema)