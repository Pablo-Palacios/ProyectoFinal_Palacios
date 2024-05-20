
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

const producto1 = new Productos(1,"Shampoo", 100)
const producto2 = new Productos(2,"Perfume", 120)
const producto3 = new Productos(3,"Desodorante", 200)



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


const lista=[producto1, producto2, producto3]

const productos = document.getElementById("productos")
let total_carro = 0


function carro(nombre, precio){
    let maxProductos = 5

    while (true){
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
            const resul = multi(precio,cantidad)
            total_carro = sumar(total_carro, resul)
            
            const produ_final = document.createElement("li")
            const carro = document.getElementById("productos_finales")

            produ_final.innerHTML = `${cantidad} - ${nombre}: $${resul} <button class="boton-eliminar">Eliminar</button>`
            carro.appendChild(produ_final)
            

            const total_carrito = document.getElementById("total")
            total_carrito.innerHTML= `Total carro: $${total_carro}`

            
            const buttonelimina = produ_final.querySelector(".boton-eliminar")
            buttonelimina.onclick = () => {
                carro.removeChild(produ_final)
                total_carro=restar(total_carro, resul)
                
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


