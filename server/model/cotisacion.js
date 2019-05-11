const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cotisacionSchema = mongoose.Schema({
    usuario:{ 
        type: Schema.Types.ObjectId, 
        ref: "usuario",
        required:true
    },
    producto:{
        type: Schema.Types.ObjectId,
        ref:"producto",
        required:true
    },
    cantidad:{
        type:Number
    },
    totalPagar:{
        type:Number
    }
})

 //MIDDLEWARE 
 const Cotizacion = mongoose.model('cotisacion', cotisacionSchema, "cotisaciones");

 //IMPORTASION 
 module.exports = {Cotizacion}
