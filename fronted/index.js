var isUpdate = false;
var id = null;



const eliminar = async(id,boton)=>{
    const response = await fetch(
        "http://localhost:3000/api/v1/"+id,{
            method:"DELETE",
            headers:{
                "Content-Type": "application/json"
            },
            // body:JSON.stringify({saludo:"Hola"})
        });
    if (response.status == 204){
        alert("Producto Eliminado correctamente");
        const card = boton.closest("li");
        card.remove();
    }else{
        if (response.ok){
            const respuesta = await response.json();
            alert(respuesta.message || "No se pudo eliminar por una causa desconocida");
        }else{
            alert("Ocurrio un problema al comunicarse con el servidor, intenta de nuevo más tarde")
        }
    }
}



document.addEventListener("DOMContentLoaded",()=>{
    const contenedorCards = document.getElementById("contenedor-cards");
    const formulario = document.getElementById("Formulario");
    const nombreInput = document.getElementById("NombreProducto");
    const precioInput = document.getElementById("precioProducto");
    const stockInput = document.getElementById("stockProducto");
    const btnLimpiar = document.getElementById("btn-limpiar");

    btnLimpiar.addEventListener("click",()=>{
        formulario.reset();
    })

    const obtenerProductosApi= async()=>{
        const response = await fetch("http://localhost:3000/api/v1");
        
        if (response.ok){
            const productos = await response.json();
            contenedorCards.innerHTML="";
            productos.map(producto=>{
                contenedorCards.innerHTML += `
                <li class="shadow-lg border border-emerald-200 rounded p-4">
                   <h3 class="text-lg font-bold text-emerald-950 ">${producto.nombre}</h3>
                    <p class="text-md font-medium text-emerald-500 my-1.5">$${producto.precio}</p>
                    <span class="block text-sm text-gray-500">stock - ${producto.stock}</span>
                    <div class="flex gap-3 mt-6">
                        <button
                        class="flex-1 px-3 py-2.5 bg-teal-100 text-teal-700 rounded-md hover:bg-teal-200 flex items-center justify-center gap-2 transition-colors duration-200">
                            <i class="bi bi-pencil-square"></i>
                            Editar
                        </button>
                        <button onclick="eliminar(${producto.id},this)"
                        class="flex-1 px-3 py-2.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200 flex items-center justify-center gap-2 transition-colors duration-200">
                            <i class="bi bi-trash3"></i>
                            Eliminar
                        </button>
                    </div>
                </li>
                `;
            });
        }
    }
    
    const actualizar = (producto)=>{
        isUpdate= true;
        id = producto.id;
        nombreInput.value = producto.nombre;
        precioInput.value = producto.precio;
        stockInput.valu = producto.stock;

    }
    

    const crearProducto = async (evt)=>{
        evt.preventDefault();
        const nombre = nombreInput.value;
        const precio = precioInput.value;
        const cantidadProducto = stockInput.value;

        const nuevoProducto = {
            nombre,
            precio,
            stock: cantidadProducto
        }
        if (!isUpdate){
            // Crear
            const response = await fetch("http://localhost:3000/api/v1/",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(nuevoProducto)
            });
            if (response.status == 201){
                alert("Producto Creado");
                formulario.reset();
                obtenerProductosApi();
            }else{
                alert("Ocurrio un problema al agregar el producto");
            }  
        }else{
            //actualizar
            const response = await fetch(`http://localhost:3000/api/v1/${id}`,{
                method:"PATCH",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevoProducto)
            })
            if (response.ok){
                formulario.reset();
                obtenerProductosApi();
            }
        }
    }

    formulario.addEventListener("submit",crearProducto);
    obtenerProductosApi();
})