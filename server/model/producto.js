//Importar 
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    Descripcion:{
        type: String,
        required: true,
        trim: true
    },
    UnidadMedida:{
        type: String,
        required:true
    },
    Precio:{
        type: Number,
        required:true
    },
    Estatus:{
        type:Number,
        require:true
    }
});

 //MIDDLEWARE 
 const Product = mongoose.model('producto', productSchema, "products");

 //IMPORTASION 
 module.exports = {Product}
