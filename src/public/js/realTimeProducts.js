const form = document.getElementById('idForm');
const socket = io.connect('http://localhost:8080');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const dataForm = new FormData(e.target); // Genera un objeto iterable
    const prod = Object.fromEntries(dataForm); // Genera un objeto simple de un objeto iterable
    
    await socket.emit('nuevoProducto', prod); // Envío el obj por socket
    e.target.reset(); // Limpio el form
});