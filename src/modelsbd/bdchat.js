
const mongoose = require('mongoose');
//Utilizaremos un esquema desde mongoos.
const { Schema } = mongoose;

//Creamos un nuevo esquemam, ponemos un objeto, en donde voy a describir
//como van a lucir nuestros datos.
const bdchatSchema = new Schema({
    nick: String,
    msg: String,
    created_at: {
        type: Date,
        default:Date.now
    }
});

//Exportamos un modelo de mongoos
module.exports = mongoose.model('bdchat', bdchatSchema);