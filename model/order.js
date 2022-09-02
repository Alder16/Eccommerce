const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema(
  // id del pedido, email cliente, array objetos
    {
      nombre: String,
      precio: Number,
      cantidad: Number,
    },
  {
    versionKey: false,
  }
  
);

module.exports = mongoose.model('Order', Order);