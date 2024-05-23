$(document).ready(function() {
    let carrito = [];
    let total = 0;

    // Función para cargar productos (simulado)
    function cargarProductos() {
        // Simulamos cargar productos desde un archivo JSON
        let productos = [
            { id: 1, nombre: "Producto 1", precio: 10.00 },
            { id: 2, nombre: "Producto 2", precio: 20.00 },
            { id: 3, nombre: "Producto 3", precio: 30.00 }
        ];

        // Agregamos los productos al HTML
        let productosHTML = "";
        productos.forEach(function(producto) {
            productosHTML += `<div class="producto">
                                <h3>${producto.nombre}</h3>
                                <p>Precio: $${producto.precio.toFixed(2)}</p>
                                <button class="btn btn-primary agregar-carrito" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Agregar al Carrito</button>
                             </div>`;
        });
        $("#productos").html(productosHTML);
    }

    // Función para agregar un producto al carrito
    function agregarAlCarrito(id, nombre, precio, cantidad) {
        // Verificamos si el producto ya está en el carrito
        let productoExistente = carrito.find(item => item.id === id);

        if (productoExistente) {
            // Si el producto ya existe, aumentamos su cantidad (hasta un máximo de 10)
            productoExistente.cantidad += cantidad;
        } else {
            // Si el producto no existe, lo agregamos al carrito
            carrito.push({ id: id, nombre: nombre, precio: precio, cantidad: cantidad });
        }

        // Actualizamos el carrito en el HTML
        actualizarCarrito();
    }

    // Función para actualizar el carrito en el HTML
    function actualizarCarrito() {
        let carritoHTML = "";
        total = 0;

        carrito.forEach(function(producto) {
            total += producto.precio * producto.cantidad;
            carritoHTML += `<li>${producto.nombre} - $${(producto.precio * producto.cantidad).toFixed(2)} - Cantidad: ${producto.cantidad} 
                            <button class="eliminar-item btn btn-danger" data-id="${producto.id}">Eliminar</button></li>`;
        });

        $("#lista-carrito").html(carritoHTML);
        $("#total").text(total.toFixed(2));
    }

    // Cargar productos al iniciar la página
    cargarProductos();

    // Evento click para abrir el modal y agregar producto al carrito
    $("#productos").on("click", ".agregar-carrito", function() {
        let id = $(this).data("id");
        let nombre = $(this).data("nombre");
        let precio = parseFloat($(this).data("precio"));
        $("#confirmarAgregarProducto").data("id", id);
        $("#confirmarAgregarProducto").data("nombre", nombre);
        $("#confirmarAgregarProducto").data("precio", precio);
        $("#cantidadProducto").val(1);
        $("#agregarProductoModal").modal("show");
    });

    // Evento click para confirmar agregar producto al carrito desde el modal
    $("#confirmarAgregarProducto").on("click", function() {
        let id = $(this).data("id");
        let nombre = $(this).data("nombre");
        let precio = $(this).data("precio");
        let cantidad = parseInt($("#cantidadProducto").val());
        agregarAlCarrito(id, nombre, precio, cantidad);
        $("#agregarProductoModal").modal("hide");
    });

    // Evento click para eliminar producto del carrito
    $("#lista-carrito").on("click", ".eliminar-item", function() {
        let id = $(this).data("id");
        eliminarDelCarrito(id);
    });

    // Función para eliminar un producto del carrito
    function eliminarDelCarrito(id) {
        // Filtramos el producto a eliminar del carrito
        carrito = carrito.filter(item => item.id !== id);
        // Actualizamos el carrito en el HTML
        actualizarCarrito();
    }
});