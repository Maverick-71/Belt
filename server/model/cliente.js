//Importaciones 
const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    comercial:{
        type: String,
        required :true
    },
    empresa:{
        type: String ,
        required : true,
        maxlength :100
    },
    atencion:{
        type: String ,
        required : true,
        maxlength :100
    },
    puesto:{
        type: String ,
        required : true,
        maxlength :70
    },
    telefono:{
        type: Number,
        required : true
    },
    fax:{
        type: String
    },
    ciudad:{
        type : String,
        maxlength:80
    },
    estado:{
        type : String,
        maxlength:80
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: 1
    }
})//fin de esquema 

//MIDDLEWARE 
const Cliente = mongoose.model('cliente', clientSchema, "clients");

//IMPORTASION 
module.exports = { Cliente }