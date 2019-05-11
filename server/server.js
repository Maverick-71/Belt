//importaciones 
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//use dotenv
require('dotenv').config();

/* Modelos de BD (DTO) */
const { User } = require('./model/usuario.js');
const { Cliente } = require('./model/cliente.js');
const { Product } = require('./model/producto.js');
const { Cotizacion } = require('./model/cotisacion.js');

//middlewarebodypardsse 
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

const port = process.env.PORT || 3002;

// constante para utilizar autenticacion siempre 
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

/* Cadena de Conexion a MongoDB */
mongoose.connect(process.env.DATABASE, 
    {useNewUrlParser:true, 'useCreateIndex': true}, (err) => {
    if(err) return err
    console.log("Conectado a MongoDB");
  });

app.listen(port,()=>{
    console.log(`Servidor Corriendo port ${port}`);
});

/* Rutas para Manejor de usuarios */
//Alta de usuario
app.post('/Belt/users/save',(req,res) =>{
    const usuario = new User(req.body)
    usuario.save((error,data)=>{
        if(error) return res.json({success:false,error});
        res.status(200).json({
            success:true,
            message:`fue creado con exito!!`
        })
    })
}); 
//Buscar Todos los Usuarios
/*app.get('/api/product/woods', (req, res) => {
  Wood.find({}, (err, woods) => {
      if(err) return res.status(400).send(err)
      res.status(200).send(woods)
  }) 
})
*/
app.get('/Belt/users/find/', async (req,res) =>{
    User.find({},(error,usuarios) =>{
        if(error) return res.status(400).send(error)
        res.status(200).send(usuarios);
    })
})
    //Edicion de USuario 
app.post('/Belt/users/edit/:email',(req,res)=>{
    const emailToSearch = req.params.email;
    const cambioInformacion = req.body; 
    console.log(req.bodys)
    User.update(
    //Buscar el email
        {email:emailToSearch},
    //Cambio en el password
        {$set:cambioInformacion},
    //CB cuando se ejecuta la edicion 
        (error ,data)=> {
            if(error){
                console.log(error);
            }
        //si no hay error 
            res.send(data)
        })
});

/* Rutas de Sesion */
app.post('/Belt/users/login', (req, res) => {
    // 1. Encuentra el correo
        User.findOne({'email': req.body.email}, (err,user) => {
            if(!user) return res.json({loginSuccess: false, message: 'Auth fallida, email no encontrado'})
    // 2. Obtén el password y compruébalo
            console.log("hola Server")
            user.comparePassword(req.body.password, (err, isMatch) => {
              if(!isMatch) return res.json({loginSuccess: false, message: "Wrong Password"})
    // 3. Si todo es correcto, genera un token
              user.generateToken((err, user)=> {
                if(err) return res.status(400).send(err)
                // Si todo bien, debemos guardar este token como un "cookie"
                res.cookie('SystemBelt_Auth', user.token).status(200).json(
                    {loginSuccess: true}
                )
            })
        })
    })
});
/* Validacion de Token en cambio de rutas */
app.get('/Belt/users/auth', auth, admin, (req, res) => {
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname
    })
  });

// Terminar Sesion 
app.get('/Belt/users/logout', auth, (req, res) => {
    User.findOneAndUpdate(
        {_id: req.user._id},
        {token: ''},
        (err, doc) => {
            if(err) return res.json({success: false, err})
            return res.status(200).json({
                success: true
            })
        })
  })

  //* Rutas para manejar clientes *//
    //Alta Clientes
app.post('/Belt/clients/save',auth, admin,(req,res) =>{
    const cliente = new Cliente(req.body);
    cliente.save((error,data)=>{
        if(error) return res.json({success:false,error});
        res.status(200).json({
            success:true,
            message:"Alta OK"
        })
    })
});
    //Busqueda Cliente por komercial 
app.get('/Belt/clients/find/:busqueda',(req,res) =>{
    const clientToSearch = req.params.busqueda;
    Cliente.find({comercial :{'$regex':  clientToSearch}})
    .then(data =>{
        console.log(data);
        res.send(data)
    })
});
//Edicion de Cliente(Solo perfil admin)
app.post('/Belt/clients/edit/:comercial',auth,admin,(req,res) =>{
    const clienteToSearch = req.params.comercial;
    const dataCambiada = req.body;
    Cliente.update({comercial:clienteToSearch},{$set:dataCambiada},
        (error,data) =>{
            if(error) console.log(error);
            res.send(data);
        })
});
/** Rutas para manejar opciones 
 * de productos (Buscar, Editar,Alta,(Borrar Logico))
 */
//Alta de Producto---solo admin
app.post('/Belt/products/save',auth,admin,(req,res) =>{
    const producto = new Product(req.body);
    producto.save((error,data) =>{
        if(error) return res.json({success:false},error);
        res.status(200).json({success:true,productData:data});
    })
});
//Consulta de Producto
app.get('/Belt/products/find/:toFind',(req,res) =>{
    const productToSearch = req.params.toFind;
    Product.find({Descripcion:productToSearch}).then(data => {
        res.send(data);
    })
});
//Editar Producto --- solo (Admin)
app.post('/Belt/products/edit/:idProducto',(req,res) =>{
    const productToSearch = req.params.idProducto;
    const cambiosProducto = req.body;
    Product.update({_id:productToSearch},
        {$set:cambiosProducto},
        (error,data) =>{
            if(error) return res.json({success:false},error);
            res.status(200).json({success:true,productData:data});
        })
});
/* Rutas para crear Cotaziones y reportes sobre ellas 
no importa perfil ya sea admin o no puede hacerlas 
y ver los reportes */
app.post('/Belt/cotisacion/new',(req,res) =>{
    const cotizacion = new Cotizacion(req.body);
    cotizacion.save((error,data) => {
        if(error) return res.json({success:false},error);
        res.status(200).json({success:true,mensaje:"Se guardo correctamente",cotizacion:data});
    })
});
// Consultar Cotizaciones por periodo de tiempo
app.get('/Belt/cotisacion/idCotizacion',( req, res ) => {
  let type = req.query.type
  let items = req.query.id
  console.log("items "+items);
  if(type === "array"){
      let ids = req.query.id.split(',')
      items = []
      items = ids.map(item => { 
          // Convertirlos en ObjectId de Mongoose
          return mongoose.Types.ObjectId(item)
      })
  }
  Cotizacion.
  find({ '_id': {$in:items}})
  .populate('usuario')
  .populate('producto')
  .exec((err, docs) => res.json(docs))
})

