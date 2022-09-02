//Declaración, incluimos paquetes, módulos, etc

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//Conexión a la base de datos
mongoose
  .connect(
    "mongodb+srv://alderpaz:87063648114@cluster0.ld5sn1b.mongodb.net/DB_productos?retryWrites=true&w=majority"
  )
  .then(function (db) {
    //que sucede si todo sale bien (o sea la conección)
    console.log("Conectado a la base de datos");
  })
  .catch(function (err) {
    //que voy a hacer si algo sale mal
    console.log(err);
  });

//Configuración

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Importo el Modelo de datos

var Products = require("./model/productos");
var Order = require("./model/order");
var usuarioPago = require("./model/userCarrito")

//Rutas

// primera ruta get
app.get("/gracias", function (req, res) {
  res.sendFile(__dirname + "/gracias.html");
});

app.get("/inicio", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// traer todos los productos al inicio
app.get("/productos", async (req, res) => {
  //traer todos los archivos guardados de la base de datos
  var productos = await Products.find();
  let tabla = [];
  for (let i = 0; i < productos.length; i++) {
    tabla =
      tabla +
      `    
        <div class="col">
          <div
            class="card"
            style="width: 18rem shadow p-3 mb-5 bg-body rounded"
          >
            <img
              src="${productos[i].img}"
              class="card-img-top"
             
            />
            <div class="card-body">
              <h5 class="card-title"><a href="/productos/${productos[i]._id}">${productos[i].nombre}</a></h5>
              <p class="card-text">
                ${productos[i].descripcion}
              </p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">${productos[i].categoria}</li>
              <li class="list-group-item">${productos[i].precio}</li>
            </ul>
            <div class="card-body">
            
            
        </div>`;
  }
  res.send(tabla);
});

app.get("/incluirProductos", (req, res) => {
  res.sendFile(__dirname + "/incluirProductos.html");
});

app.get("/carrito", (req, res) => {
  res.sendFile(__dirname + "/carrito.html");
});

app.get("/productos/:id", async (req, res) => {
  res.sendFile(__dirname + "/detalles.html");
});

app.get("/usuarioForm", async (req, res) => {
  res.sendFile(__dirname + "/usuarioForm.html");
});

//visualizar compra
app.get("/listadoPedido", async (req, res) => {
  let buscador = await Order.find();
  let files = "";
  let totalPedido = 0;

  for (let i = 0; i < buscador.length; i++) {         
    files +="<tr>"
    files += "<td>"+"<button id='"+buscador[i]._id+"' class='eliminar'>Quitar</button>"+"</td>"
    files += "<td>" + buscador[i].nombre + "</td>"
    files +='<td>COP$' + buscador[i].precio + '</td>'
    files +='<th>' + buscador[i].cantidad + '</th>'       
    var cantP = parseInt(buscador[i].cantidad);
    var precioP = parseInt(buscador[i].precio)
    var total = cantP*precioP;
    files +='<th>COP$' + total +'</th>'+ "</tr>"
    totalPedido = totalPedido + total;
    files += "<h2 clase='btn btn success'>"+ totalPedido + "</h2>"
  }
  console.log(`El valor total es ${totalPedido}`)
  console.log(files)
  res.send({
    total: totalPedido,
    html: files,
  })
});


app.get("/totalPedido", async (req, res) =>{
  var pedido = await Order.find()
  res.send(pedido)
})


app.post("/carritoProducs", async (req, res) => {
  //traer todos los archivos guardados de la base de datos
  var productos = await Order.find();
  res.send(productos)
});


// visualzar producto que se quiere comprar
app.post("/productos/:id", async (req, res) => {
  let buscador = await Products.findById(req.params.id);
  res.send(buscador);
});

// insertar productos a la base de datos

app.post("/incluirProductos", async function (req, res) {
  let datos_form = req.body;
  let p = new Products(datos_form);
  await p.save();
  res.send("Producto guardado");
});

// para agregar la cantidad de productos
app.post("/incluirCarrito", async (req, res) => {
  let datos_order = req.body;
  let d_o = new Order(datos_order);
  await d_o.save();
  res.send("Productos incluidos");
});

// insertar datos de usuario a la base de datos

app.post("/usuarioForm", async function (req, res) {
  let usuario_form = req.body;
  let p = new usuarioPago(usuario_form);
  console.log(p)
  await p.save();
  res.send("Producto guardado");
});

app.delete("/carrito/:id", async (req, res)=> {
  let parametro = req.params.id;
  console.log(parametro)
  var p = await Order.findById(parametro)
  await p.remove()

  res.send(p);
})



//Listen
app.listen(3000, function () {
  console.log("Servidor iniciado en puerto 3000");
});
