var isUpdate = false;
var id = null;

const eliminar = async (id, boton) => {
    const response = await fetch(`http://localhost:3000/api/v1/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    });
    if (response.status === 204) {
        alert("Producto eliminado correctamente");
        const card = boton.closest("li");
        card.remove();
    } else {
        if (response.ok) {
            const respuesta = await response.json();
            alert(respuesta.message || "No se pudo eliminar por una causa desconocida");
        } else {
            alert("Ocurrió un problema al comunicarse con el servidor, intenta de nuevo más tarde");
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const contenedorCards = document.getElementById("contenedor-cards");
    const formulario = document.getElementById("Formulario");
    const nombreInput = document.getElementById("NombreProducto");
    const precioInput = document.getElementById("precioProducto");
    const stockInput = document.getElementById("stockProducto");
    const btnLimpiar = document.getElementById("btn-limpiar");

    btnLimpiar.addEventListener("click", () => {
        formulario.reset();
        isUpdate = false;
        id = null; // Reinicia el estado
    });

    const obtenerProductosApi = async () => {
        const response = await fetch("http://localhost:3000/api/v1/");
        if (response.ok) {
            const productos = await response.json();
            contenedorCards.innerHTML = "";
            productos.forEach((producto) => {
                const li = document.createElement('li');
                li.className = "shadow-lg border border-emerald-200 rounded p-4";

                li.innerHTML = `
                    <h3 class="text-lg font-bold text-emerald-950 ">${producto.nombre}</h3>
                    <p class="text-md font-medium text-emerald-500 my-1.5">$${producto.precio}</p>
                    <span class="block text-sm text-gray-500">stock - ${producto.stock}</span>
                `;

                const div = document.createElement('div');
                div.className = "flex gap-3 mt-6";

                const btnEditar = document.createElement('button');
                btnEditar.className = "flex-1 px-3 py-2.5 bg-teal-100 text-teal-700 rounded-md hover:bg-teal-200 flex items-center justify-center gap-2 transition-colors duration-200";
                btnEditar.innerHTML = `<i class="bi bi-pencil-square"></i> Editar`;
                btnEditar.addEventListener('click', () => actualizar(producto));

                const btnEliminar = document.createElement('button');
                btnEliminar.className = "flex-1 px-3 py-2.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200 flex items-center justify-center gap-2 transition-colors duration-200";
                btnEliminar.innerHTML = `<i class="bi bi-trash3"></i> Eliminar`;
                btnEliminar.addEventListener('click', () => eliminar(producto.id, btnEliminar));

                div.appendChild(btnEditar);
                div.appendChild(btnEliminar);
                li.appendChild(div);
                contenedorCards.appendChild(li);
            });
        }
    };

    const actualizar = (producto) => {
        isUpdate = true;
        id = producto.id;
        nombreInput.value = producto.nombre;
        precioInput.value = producto.precio;
        stockInput.value = producto.stock;
    };

    window.actualizar = actualizar;

    const crearProducto = async (evt) => {
        evt.preventDefault();
        const nombre = nombreInput.value;
        const precio = parseFloat(precioInput.value); // Convierte a número
        const cantidadProducto = parseInt(stockInput.value, 10); // Convierte a entero

        if (!nombre || isNaN(precio) || isNaN(cantidadProducto)) {
            alert("Por favor completa todos los campos correctamente.");
            return;
        }

        const nuevoProducto = {
            nombre,
            precio,
            stock: cantidadProducto
        };

        if (!isUpdate) {
            // Crear producto
            const response = await fetch("http://localhost:3000/api/v1/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevoProducto)
            });
            if (response.status === 201) {
                alert("Producto creado correctamente");
                formulario.reset();
                obtenerProductosApi();
            } else {
                alert("Ocurrió un problema al agregar el producto");
            }
        } else {
            // Actualizar producto
            if (!id) {
                alert("Error: No se puede actualizar porque el ID es inválido.");
                return;
            }

            const response = await fetch(`http://localhost:3000/api/v1/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevoProducto)
            });
            if (response.ok) {
                alert("Producto actualizado correctamente");
                formulario.reset();
                isUpdate = false; // Reinicia el estado
                id = null; // Reinicia el ID
                obtenerProductosApi();
            } else {
                alert("Ocurrió un problema al actualizar el producto");
            }
        }
    };

    formulario.addEventListener("submit", crearProducto);
    obtenerProductosApi();
});
