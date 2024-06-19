
class Productos{
    constructor(id, nombre, precio){
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.precioOriginal = precio
    }
    
}

// Creacion de objetos 
const producto1 = new Productos(1,"Shampoo", 2000)
const producto2 = new Productos(2,"Perfume", 10000)
const producto3 = new Productos(3,"Desodorante", 3000)
const producto4 = new Productos(4,"Crema", 4500)

// lista para manejar los productos creados
const lista=[producto1, producto2, producto3, producto4]


// Documents iniciales
const productos = document.getElementById("productos")
const Carro = document.getElementById("carrito")
const boton_finalizar_carro = Carro.querySelector(".boton-finalizar-carro")
const boton_eliminar_carro = Carro.querySelector(".boton-eliminar-carro")

// variables de inicio
let total_carro = 0
let lista_carro = []
let cantidad = 0

// Local storage
const guardarElementosCarros = (clave, valor) => (localStorage.setItem(clave, valor))



// funciones

function restar(a,b){
    let resultado = a - b
    return parseFloat(resultado.toFixed(2))
}

function sumar(a,b){
    let resultado = a + b
    return parseFloat(resultado.toFixed(2))
}

function multi(precio,cantidad){
    let resultado = precio*cantidad
    return parseFloat(resultado.toFixed(2))
}

function convertir_moneda(precios, moneda){
    const conv = (precios/moneda)
    return parseFloat(conv)
}

function convertir(precio_moneda){
    lista.forEach( x =>{
        x.precio = convertir_moneda(x.precioOriginal, precio_moneda)
    })
}

function lista_productos_html(){
    lista.forEach(x => {
        const li = document.querySelector(".product-item")
                  
        li.innerHTML =`<div class="product-details">
                        <span class="product-name">${x.nombre}</span>
                        <span class="product-price">$${x.precio.toFixed(2)}</span>
                    </div>
                    <button class="boton-comprar">Añadir al carrito</button>`
        
        productos.appendChild(li)
        const boton = li.querySelector(".boton-comprar")
        boton.onclick = () => (carro(x.nombre, x.precio))

})}

function remover_carro(){
    const total_carrito = document.getElementById("total");
    const tds = document.querySelectorAll('td');

    tds.forEach(td => td.remove());
            localStorage.removeItem("listaCarro");
            total_carro = 0;
            lista_carro = [];
            total_carrito.innerHTML = `Total carro: $${total_carro}`;
}
                

// Funcion de cambio de moneda

document.addEventListener("DOMContentLoaded", function() {
    const selector_mone = document.getElementById("selector_moneda")

    selector_mone.addEventListener("change", function() {
        const moneda = selector_mone.value
        switch (moneda){
            case "ARG":
                convertir(1)
                remover_carro()
                lista_productos_html()
                break
            case "USD":
                const usd = parseFloat(jsonMonedas.list[0].dolar_blue)            
                convertir(usd)
                remover_carro()
                lista_productos_html()                
                break
            case "EUR":
                const eur = parseFloat(jsonMonedas.list[0].euro)
                convertir(eur)
                remover_carro()
                lista_productos_html()
                break
            case "REAL":
                const real = parseFloat(jsonMonedas.list[0].real)
                convertir(real)
                remover_carro()
                lista_productos_html()
                break
            default:
                alert("moneda no encontrada")
        }
        
    })
})



function carro(nombre, precio){
    const carro = document.getElementById("productos_finales")
    const total_carrito = document.getElementById("total")


    while (true){

                // primero se verifica que si el elemento que se selecciono ya existe en el carro por su nombre 
            const verificar = lista_carro.find((x) => x.nombre === nombre)
                // y luego se pasa a un booleano para que sea mas facil manejar
            const element_exist = verificar !== undefined
            

            if(element_exist){
                    const li_carro = carro.querySelector(`tr[data-producto="${nombre}"]`)
                    if(li_carro){
                    // si existe, se le toma los valores actuales y se le suman las cantidades seleccionadas y su precio
                    // Se rescribe los datos en el mismo
                    // en los calculos, se toman la cantidad ya asignada y se le suma la cantidad nueva del promp, luego esa cantidad total se le multiplica el preciofijo 
                    // luego ese precio actualizado se la coloca en la variable del precio
                    const currentPrecio = verificar.precio
                    verificar.cantidad = sumar(verificar.cantidad, 1)
                    const precio_update =  multi(verificar.cantidad, precio)
                    verificar.precio = parseFloat(precio_update.toFixed(2))
                    
                    // Para el total, se resta el el precio recien obtenido cuando se creo y su total y luego se suma el precio actualizado con las cantidades
                    total_carro = total_carro - currentPrecio + precio_update
                    
                    //se actualizan los cambios de los valores en el carro del html
                    li_carro.innerHTML = `
                            <td>${verificar.cantidad}</td> 
                            <td>${nombre}</td>
                            <td>${verificar.precio}</td> 
                            <td><button class="boton-eliminar">Eliminar</button></td>`

                    }
                }
            else{
                    cantidad = 1
                    // si el producto no existe ya en el carro, crea uno nuevo
                    const resul = multi(precio,cantidad)
                    total_carro = sumar(total_carro, resul)

                    // se agrega el prodcuto y sus datos a la lista del carrito
                    lista_carro.push({"cantidad":cantidad, "nombre":nombre, "precio":resul})
                    //console.log(lista_carro)

                    const produ_final = document.createElement("tr");
                    produ_final.setAttribute('data-producto', nombre);

                    // aca se agrega al carro del html
                    produ_final.innerHTML = `
                        <td>${cantidad}</td> 
                        <td>${nombre}</td>
                        <td>${resul.toFixed(2)}</td> 
                        <td><button class="boton-eliminar">Eliminar</button></td>`
                    carro.appendChild(produ_final)

                    localStorage.getItem(produ_final)

                    
                }
                // visual de monto final del carro cuando se carga por primera vez
            total_carrito.innerHTML= `Total carro: $${total_carro.toFixed(2)}`
                
            guardarElementosCarros("listaCarro", JSON.stringify(lista_carro))
    
            break
           
        }          
    }


function finalizar_carro(){
    const carro = document.getElementById("productos_finales")
    const li_carro = carro.querySelectorAll("tr")
    const total_carrito = document.getElementById("total");
    const tds = document.querySelectorAll('td');

    if(li_carro.length > 0){
        const total = total_carrito.textContent
        Swal.fire({
            title: "Finaliza su compra?",
            icon: "cuidado!",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Compra Finalizada",
                    text: `Tu compra finaliza con estos productos con un  ${total}`,
                    icon: "success"
                });
                total_carro = 0;
                lista_carro = [];
                total_carrito.innerHTML = `Total carro: $${total_carro}`;
                tds.forEach(td => td.remove());
            }
        });
        
    }
    else{
        Swal.fire("Carrito vacio!");
    }
}

function eliminar_carro() {
    const total_carrito = document.getElementById("total");
    const tds = document.querySelectorAll('td');

    Swal.fire({
        title: "Desea borrar el carro?",
        text: "Se borraran todos los elementos seleccionados",
        icon: "cuidado!",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borrar!",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            tds.forEach(td => td.remove());
            localStorage.removeItem("listaCarro");

            total_carro = 0;
            lista_carro = [];
            total_carrito.innerHTML = `Total carro: $${total_carro}`;

            Swal.fire({
                title: "Borrado!",
                icon: "success"
            });
        }
    });
}

// Lista de productos iniciales

for(const x of lista){
    const li = document.createElement("ul")
    li.className = "product-item"
              
    li.innerHTML =`<div class="product-details">
                        <span class="product-name">${x.nombre}</span>
                        <span class="product-price">$${x.precio.toFixed(2)}</span>
                    </div>
                    <button class="boton-comprar">Añadir al carrito</button>`
                    
    productos.appendChild(li);
    
    const boton = li.querySelector(".boton-comprar")
    boton.onclick = () => (carro(x.nombre, x.precio))

    
}


// accion de botones
boton_finalizar_carro.onclick = finalizar_carro
boton_eliminar_carro.onclick = eliminar_carro





