const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//modelo de datos

const usuarioPago = new Schema(
  {
    nombre: String,
    apellido: String,
    direccion: String,
    correo: String,
    tarjetaCredito: String,
    mesExp: String ,
    yearExp: String,
    ccv: String ,
    nameTarjeta: String 
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("usuarioPago", usuarioPago);