
//el web service lo estamos manejando con Express
const http = require('http');
const path = require('path');
//express
const express = require('express');

const socketio = require('socket.io');

//requerimos a la biblioteca mongoose
const mongoose = require('mongoose');

//Express
const app = express();

const server = http.createServer(app);
const io = require('socket.io')(server);

//conexion a la base de datos, a que bd nos vamos a conectar.
//Creamos nuestra bd llamada chat-databse.
mongoose.connect('mongodb://localhost/chat-database')
//Nos muerstra que si se conecto con el comentario.
.then(db => console.log('base de datos conectada'))
//y si no nos manda un error
.catch(err => console.log(err));

//configuramos el puerto para subirlo en la internet
//si el servidor me esta dando un puerto lo va a tomar en caso contrario agarra 
//el puerto 3000.
app.set('port', process.env.PORT || 3000);

require('./sockets')(io);

//sirviendo el contenido html
app.use(express.static(path.join(__dirname, 'public')));

//iniciando el servidor
server.listen(app.get('port'), ()=>{
    console.log('servidor activo', app.get('port'));
});
