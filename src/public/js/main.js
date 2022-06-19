//este sockets mantiene la conexion en tiempo real con mi servidor

$(function() {
    //este es la conexion del socket del cliente    
    const socket = io();

    ////obteniendo los elementos de DOM de nuestro formulario de la interface.
    const messageForm = $('#message-form');
    const messageBox = $('#message');
    const chat = $('#chat');

    //obteniendo los elementos de DOM de nuestro formulario 'nickname' que es el usuario.
    const nickForm = $('#nickform');
    const nickError = $('#nickError');
    const nickName = $('#nickName');

    const users = $('#usernames');

    nickForm.submit(e => {
        e.preventDefault();
        socket.emit('new user', nickName.val(), data =>{
            if(data){
                $('#nickWrap').hide();
                $('#contentWrap').show();
            }else {
                nickError.html(`
                <div class="alert alert-danger">
                    Ese usuario ya existe...
                </div>
                `);
            }
            nickName.val('');
        });
    });


    //eventos a traves del formulario
    messageForm.submit(e =>{
        e.preventDefault();
        socket.emit('send message' , messageBox.val(), data => {
            chat.append(`<p class="error">${data}</p>`);
        });
        messageBox.val('');
    });
    // aqui estamos preparando a los clientes que estan conectados a trves del evento
    //que se creo en el servidor

   socket.on('new message', function(data){
    // ahora vamos a recibir un objeto 
        chat.append('<b>'+ data.nick +'<b/>: ' +data.msg+ '<br/>');
   }); 


    //recibimos los datos en la cual agrega a los usuarios ,
    //manda a mostralos.
   socket.on('usernames', data => {
    let html = '';
    for(let i = 0; i < data.length; i++){
        html += `<p><i class="fas fa-user"></i> ${data[i]}</p>`    
    }
    users.html(html);
});

    socket.on('whisper', data => {
        chat.append(`<p class="whisper"><b>${data.nick}:</b>${data.msg}</p>`);
    });

    //carga los viejos mensajes
    socket.on('carga los viejos mensajes', msgs => {
        for(let i = 0; i > msgs.length; i++){
            displayMsg(msgs[i]);
        }
    });

    //cargando los mensajes generado a traves de javaScript
    function displayMsg(data){
        chat.append(`<p class="whisper"><b>${data.nick}:</b>${data.msg}</p>`);
    }

});
