const bdchat = require('./modelsbd/bdchat');

//es la conexion del socket del servidor
module.exports = function(io){

    let users = {};

    //io tiene a todos los usuarios conectados
    io.on('connection', async socket =>{
        console.log('nuevo usuario conectado');

        let messages = await bdchat.find({});
        socket.emit('cargando los mensajes', messages);

        socket.on('new user', (data, cb) => {
            if(data in users){
                cb(false);
            }else {
                cb(true);
                socket.nickname = data;
                users[socket.nickname] = socket;
                updateNickname();
            }
        });
//cuando el cliente me envie este mensaje 'send message' el servidor va a reenviar estos datos
//a traves del nuevo evento 'new message'.
        socket.on('send message', async(data, cb) =>{
            //analisando el xontenido del mensaje que se 
            //le va a enviar.

            "joe asasasasas"
            var msg = data.trim();

            if(msg.substr(0, 3) === '/p '){
                msg = msg.substr(3);
                const index = msg.indexOf(' ');
            if(index !== -1){
                var name = msg.substring(0, index);
                var msg = msg.substring(index + 1)
                if(name in users){
                    users[name].emit('whisper', {
                    msg,
                    nick: socket.nickname
                });
                }else {
                    cb('Error! Ingrese un usuario valido');
                }
            }else {
                cb('Error! Porfavor ingrese su mensaje');
            }    
            }else {
            //mensaje que le almacenaremos a la base de datos
            var newMsg = new bdchat({
                msg,
                nick: socket.nickname
            });
            await newMsg.save();
            
            //retransmitimos el mensaje 
            io.sockets.emit('new message', {
                msg: data,
                nick: socket.nickname
            });
            }   
        });

        socket.on('disconnect', data => {
            if(!socket.nickname) return;
            delete users[socket.nickname];
            updateNickname();
        });

        function updateNickname(){
            io.sockets.emit('usernames', Object.keys(users));
        }
    });
}