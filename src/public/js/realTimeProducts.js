const socket = io();
const form = document.getElementById('idForm');
const botonProds = document.getElementById('botonProductos');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dataForm = new FormData(e.target); // Genera un objeto iterable
    const prod = Object.fromEntries(dataForm); // Genera un objeto simple de un objeto iterable
    
    socket.emit('nuevoProducto', prod); // Envío el obj por socket
    // e.target.reset(); // Limpio el form
});

botonProds.addEventListener('click', () => {
    console.log('botonProductos hace click')
    
    socket.on('prods', (productos) => {
        console.log(productos);
    });
});