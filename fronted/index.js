var isUpdate = false;
var id = null;

const crearProducto = async (evt) => {
    evt.preventDefault();

    // Obtén los valores del formulario
    const nombre = nombreInput.value;
    const precio = parseFloat(precioInput.value); // Asegura que sea numérico
    const cantidadProducto = parseInt(stockInput.value, 10); // Asegura que sea un número entero

    // Valida que los datos sean correctos
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
            body: JSON.stringify(nuevoProducto),
        });

        if (response.status === 201) {
            alert("Producto creado");
            formulario.reset();
            obtenerProductosApi();
        } else {
            alert("Ocurrió un problema al agregar el producto.");
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
            body: JSON.stringify(nuevoProducto),
        });

        if (response.ok) {
            alert("Producto actualizado");
            formulario.reset();
            isUpdate = false; // Reinicia el estado
            id = null;
            obtenerProductosApi();
        } else {
            alert("Ocurrió un problema al actualizar el producto.");
        }
    }
};

const obtenerProductosApi = async () => {
    const response = await fetch("http://localhost:3000/api/v1/");
    if (response.ok) {
        const productos = await response.json();
        contenedorCards.innerHTML = "";
        productos.forEach((producto) => {
            contenedorCards.innerHTML += `
            <li class="shadow-lg border border-emerald-200 rounded p-4">
                <h3 class="text-lg font-bold text-emerald-950 ">${producto.nombre}</h3>
                <p class="text-md font-medium text-emerald-500 my-1.5">$${producto.precio}</p>
                <span class="block text-sm text-gray-500">stock - ${producto.stock}</span>
                <div class="flex gap-3 mt-6">
                    <button onclick="actualizar(${JSON.stringify(producto)})"
                    class="flex-1 px-3 py-2.5 bg-teal-100 text-teal-700 rounded-md hover:bg-teal-200 flex items-center justify-center gap-2 transition-colors duration-200">
                        <i class="bi bi-pencil-square"></i>
                        Editar
                    </button>
                    <button onclick="eliminar(${producto.id}, this)"
                    class="flex-1 px-3 py-2.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200 flex items-center justify-center gap-2 transition-colors duration-200">
                        <i class="bi bi-trash3"></i>
                        Eliminar
                    </button>
                </div>
            </li>
            `;
        });
    } else {
        alert("Ocurrió un problema al obtener los productos.");
    }
};

const actualizar = (producto) => {
    isUpdate = true;
    id = producto.id;
    nombreInput.value = producto.nombre;
    precioInput.value = producto.precio;
    stockInput.value = producto.stock;
};
