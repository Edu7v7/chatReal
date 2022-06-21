TODO ESTO LO GENERAMOS EN LA CONSOLA DE VISUAL STUDIO O CMD
PASO 1
POR EDUARDO.....................................
Generamos el archivo init.
COMANDO:
npm init --yes

PASO 2
Ahora instalamos dependencias, instalamos el Framewor de Express.
Express nos ayuda para escribir aplicaciones del servidor.
COMANDO:
npm install express

PASO 3
WebSocket: instalamos el modulo socket.
COMANDO:
npm install socket.io

PASO 4
Instalamos el modulo de node js llamado nodemon.
lo instalamos como una dependencia de desarrollo, solo
lo usaremos para que se nos haga mas facil el trabajo
al escribir el proyecto.
Me ayuda el modulo a actulisarse automaticamente cada cambio que le demos.
COMANDO:
npm istall nodemon -D

"scripts": {
    "start": "nodemon src/index.js"
  },

PASO 5
instalamos un biblioteca nos permite conectarnos y tambien nos permite
definir los datos que se almacenaran en la BD. la biblioteca es mongoose
COMANDO:
npm install mongoose