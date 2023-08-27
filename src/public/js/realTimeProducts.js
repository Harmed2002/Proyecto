const form = document.getElementById('idForm');
// const socket = io.connect('http://localhost:8080');
const socket = io();

socket.emit('mensajeConexion', { user: "Admin", rol: "Admin" }); // Emito un mensaje

socket.on('credencialesConexion', (info) => { // Recibo el mensaje
	console.log("cliente conectado");
	console.log(info);
})

form.addEventListener('submit', async (e) => {
	e.preventDefault();
	const dataForm = new FormData(e.target); // Genera un objeto iterable
	const prod = Object.fromEntries(dataForm); // Genera un objeto simple de un objeto iterable

	await socket.emit('nuevoProducto', prod); // Envío el obj por socket
	e.target.reset(); // Limpio el form
});

// Muestro en la tabla los nuevos productos
socket.on('products-details', (products) => {
	const detailProds = document.querySelector("#productsDetail tbody");
	let detailHTML = '';
	if (products) {
		products.forEach(product => {
			detailHTML += 
				`<tr>
					<td>${product.id}</td>
					<td>${product.title}</td>
					<td>${product.description}</td>
					<td>${product.category}</td>
					<td>${product.price}</td>
					<td>${product.code}</td>
					<td>${product.stock}</td>
				</tr>`;
		});

	} else {
		console.error('Lista de productos vacía');
	}

	detailProds.innerHTML = detailHTML;

});