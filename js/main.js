// Array para almacenar los productos cargados desde un JSON local o API externa
let perfumes = [];

// Variable para el carrito
let carrito = [];

// Función para cargar los productos desde un JSON local usando fetch
async function cargarProductos() {
    try {
        const response = await fetch('./data/perfumes.json'); // JSON local con productos
        perfumes = await response.json();
        mostrarProductos();
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}

// Función para mostrar los productos en el DOM
function mostrarProductos() {
    const perfumeList = document.getElementById('perfume-list');
    perfumeList.innerHTML = ''; // Limpiar el contenedor antes de cargar los productos

    perfumes.forEach(perfume => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('product');
        productoDiv.innerHTML = `
            <img src="${perfume.imagen}" alt="${perfume.nombre}">
            <h3>${perfume.nombre}</h3>
            <p>$${perfume.precio}</p>
            <button onclick="agregarAlCarrito(${perfume.id})">Agregar al carrito</button>
        `;
        perfumeList.appendChild(productoDiv);
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(id) {
    const perfume = perfumes.find(p => p.id === id);
    carrito.push(perfume);
    mostrarCarrito();

    // Usando SweetAlert2 para mostrar una alerta amigable
    Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: `${perfume.nombre} ha sido agregado al carrito.`,
        timer: 1500,
        showConfirmButton: false
    });
}

// Función para mostrar los productos del carrito
function mostrarCarrito() {
    const carritoList = document.getElementById('carrito-list');
    carritoList.innerHTML = ''; // Limpiar el carrito antes de mostrarlo

    carrito.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <p>${item.nombre} - $${item.precio} 
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button></p>
        `;
        carritoList.appendChild(itemDiv);
    });
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
}

// Función para finalizar compra
document.getElementById('finalizar-compra').addEventListener('click', () => {
    if (carrito.length === 0) {
        Swal.fire('El carrito está vacío.');
    } else {
        // Mensaje con SweetAlert2
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Estás a punto de finalizar tu compra.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, comprar'
        }).then((result) => {
            if (result.isConfirmed) {
                carrito = [];
                mostrarCarrito();
                document.getElementById('mensaje-compra').innerText = "¡Gracias por tu compra!";
                Swal.fire('¡Compra realizada!', 'Gracias por tu compra.', 'success');
            }
        });
    }
});

// Cargar los productos desde el JSON al iniciar la página
cargarProductos();
