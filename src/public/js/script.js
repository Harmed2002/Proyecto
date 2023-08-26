// Acá configuramos el cliente de Socket, ya que esto está en el front
const socket = io();

socket.emit('mensajeConexion', { user: "francisco", rol: "User" }); // Emito un mensaje

socket.on('credencialesConexion', (info) => { // Recibo el mensaje
    console.log(info);
})