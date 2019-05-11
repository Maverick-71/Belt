//Importaciones 
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//middleware 
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const { Cotizacion } = require('./model/cotisacion.js');

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
