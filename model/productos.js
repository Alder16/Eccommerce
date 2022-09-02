const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//modelo de datos

const Producto = new Schema(
  {
    img: { type: String, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    categoria: { type: String, required: true },
    precio: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Producto", Producto);