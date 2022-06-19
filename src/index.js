
const http = require('http');
const path = require('path');

const express = require('express');
const socketio = require('socket.io');

const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

//conexion a la base de datos
mongoose.connect('mongodb://localhost/chat-database')
.then(db => console.log('base de datos conectada'))
.catch(err => console.log(err));

//configuramos el puerto para subirlo en la internet
//si el servidor me esta dando un puerto lo va a tomar en caso contrario agarra 
//el puerto 3000.
app.set('port', process.env.PORT || 3000);

require('./sockets')(io);

//nombres de los archivos que no cambian
app.use(express.static(path.join(__dirname, 'public')));

//iniciando el servidor
server.listen(app.get('port'), ()=>{
    console.log('servidor activo', app.get('port'));
});
