
class Productos{
    constructor(id, nombre, precio){
        this.id = id
        this.nombre = nombre
        this.precio = precio
    }

    mostrar(){ 
        return(this.id+"." + this.nombre+" "+ "$"+this.precio)
    }
}


// const lista_carro = [
//     {"nombre":nombre, "precio":precio}
// ]




const producto1 = new Productos(1,"Shampoo", 100)
const producto2 = new Productos(2,"Perfume", 120)
const producto3 = new Productos(3,"Desodorante", 200)
const producto4 = new Productos(4,"Crema", 150)



function restar(a,b){
    let resultado = a - b
    return parseInt(resultado)
}

function sumar(a,b){
    let resultado = a + b
    return parseInt(resultado)
}

function multi(precio,cantidad){
    let resultado = precio*cantidad
    return parseFloat(resultado)
}


const lista=[producto1, producto2, producto3, producto4]

const productos = document.getElementById("productos")
let total_carro = 0
let lista_carro = []




function carro(nombre, precio){
    let maxProductos = 5
    const carro = document.getElementById("productos_finales")
    const li_carro = carro.querySelector("li")
    const total_carrito = document.getElementById("total")
    const produ_final = document.createElement("li")

    while (true){
        // promp que recibe la cantidad de productos
        let cantidad = parseInt(prompt("Seleccionaste: " + nombre + "$"+precio+"\n" + "Ingresa la cantidad que deseas llevar")
                                        + "\n" + "Solo puedes llevar una maxima de 5 intentos")
        
        
        if(isNaN(cantidad) || cantidad < 0){
            alert("Ingrese un caracter correcto")
        }
        else if(cantidad > maxProductos){
            alert("No se puede agregar mas de 5 unidades")
        }
        else if(cantidad === 0){
            alert("Debes agregar un producto por lo menos")
        }
        else{
            // primero se verifica que si el elemento que se selecciono ya existe en el carro por su nombre 
            const verificar = lista_carro.find((x) => x.nombre === nombre)
            // y luego se pasa a un booleano para que sea mas facil manejar
            const element_exist = verificar !== undefined
            

            if(element_exist){
                // si existe, se le toma los valores actuales y se le suman las cantidades seleccionadas y su precio
                // Se rescribe los datos en el mismo
                // en los calculos, se toman la cantidad ya asignada y se le suma la cantidad nueva del promp, luego esa cantidad total se le multiplica el preciofijo 
                // luego ese precio actualizado se la coloca en la variable del precio
                const currentPrecio = verificar.precio
                verificar.cantidad = sumar(verificar.cantidad, cantidad)
                const precio_update =  multi(verificar.cantidad, precio)
                verificar.precio = precio_update
                
                // Para el total, se resta el el precio recien obtenido cuando se creo y su total y luego se suma el precio actualizado con las cantidades
                total_carro = sumar(restar(currentPrecio, total_carro), precio_update) 
                
                //se actualizan los cambios de los valores en el carro del html
                li_carro.innerHTML = `${verificar.cantidad} - ${nombre}: $${verificar.precio} <button class="boton-eliminar">Eliminar</button>`

                //monto total del carro actualizandose de los montos cambiados y sumando el valor que ya poseeia con el nuevo
                total_carrito.innerHTML= `Total carro: $${total_carro}`

                // funcion del boton eliminar en update
                const buttonelimina = li_carro.querySelector(".boton-eliminar")
                buttonelimina.onclick = () => {
                carro.removeChild(li_carro)
                total_carro=restar(total_carro, verificar.precio)
                // aca borra el producto de la lista del carro
                const index = lista_carro.findIndex(item => item.nombre === nombre)
                if(index > -1){
                    lista_carro.splice(index, 1)
                    
                }
                // monto final del carrito restado lo que se elimino
                total_carrito.innerHTML= `Total carro: $${total_carro}`
                }

            }else{
                // si el producto no existe ya en el carro, crea uno nuevo
                const resul = multi(precio,cantidad)
                total_carro = sumar(total_carro, resul)

                // se agrega el prodcuto y sus datos a la lista del carrito
                lista_carro.push({"cantidad":cantidad, "nombre":nombre, "precio":resul})
                console.log(lista_carro)

                // aca se agrega al carro del html
                produ_final.innerHTML = `${cantidad} - ${nombre}: $${resul} <button class="boton-eliminar">Eliminar</button>`
                carro.appendChild(produ_final)

                // boton eliminar 
                const buttonelimina = produ_final.querySelector(".boton-eliminar")
                buttonelimina.onclick = () => {
                carro.removeChild(produ_final)
                total_carro=restar(total_carro, resul)
                // aca borra el producto de la lista del carro
                const index = lista_carro.findIndex(item => item.nombre === nombre)
                if(index > -1){
                    lista_carro.splice(index, 1)
                }
                // monto final del carrito restado lo que se elimino
                total_carrito.innerHTML= `Total carro: $${total_carro}`
                }

            // visual de monto final del carro cuando se carga por primera vez
            total_carrito.innerHTML= `Total carro: $${total_carro}`

            }

            break
        }          
    }
}



for(const x of lista){
    const nombres = document.createElement("ul")
              
    nombres.innerHTML =`
                        <li>${x.nombre}: $${x.precio} <button class="boton-compra">Comprar</button></li>
                        `
    
    productos.appendChild(nombres);
    
    const boton = nombres.querySelector(".boton-compra")
    boton.onclick = () => (carro(x.nombre, x.precio))

    
}


