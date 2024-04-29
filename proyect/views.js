
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
    resultado = a - b
    return parseInt(resultado)
}




function mostrarProductos(){
    const lista=[producto1.mostrar(), producto2.mostrar(), producto3.mostrar(),"4.Salir"]
    let mensaje = "Indique el numero del producto que desea comprar" + "\n"
    for(const i of lista){
        mensaje += i + "\n"
    }

    let intentos = 0
    const maxIntentos = 2
    while(intentos < maxIntentos){
        const compra = parseInt(prompt(mensaje))
        if(compra === 1){
            const pago = parseInt(prompt("Seleccionaste: " + producto1.mostrar() +"\n"+
                                        "Agrega el monto"))
           
            if(pago >= producto1.precio){
                let vuelto = restar(pago, producto1.precio)

                alert("Compraste: " + producto1.nombre + "\n" + "su vuelto es: " + vuelto)
                alert("Gracias por su compra. Vuelvas prontos")
                break;
            }else{
                intentos++;
                if(intentos < maxIntentos){
                    alert("No alcanza, le faltan: $" + restar(producto1.precio, pago) + "\n" +
                        "Le quedan " + (maxIntentos - intentos) + " intento" + "\n" +
                        "Intente de nuevo")
                }
                else{
                    alert("se te acabaron los intentos. Chau")
                    break;
                }
                
            }
        }
        else if(compra === 2){
            const pago = parseInt(prompt("Seleccionaste: " + producto2.mostrar()+"\n"+
                                        "Agrega el monto"))
           
            if(pago >= producto2.precio){
                let vuelto = restar(pago, producto2.precio)

                alert("Compraste: " + producto2.nombre + "\n" + "su vuelto es: " + vuelto)
                alert("Gracias por su compra. Vuelvas prontos")
                break;
            }else{
                intentos++;
                if(intentos < maxIntentos){
                    alert("No alcanza, le faltan: $" + restar(producto1.precio, pago) + "\n" +
                        "Le quedan " + (maxIntentos - intentos) + " intento" + "\n" +
                        "Intente de nuevo")
                }
                else{
                    alert("se te acabaron los intentos. Chau")
                    break;
                }
                
            }
        }
        else if(compra === 3){
            const pago = parseInt(prompt("Seleccionaste: " + producto3.mostrar() +"\n"+
                                        "Agrega el monto"))
           
            if(pago >= producto3.precio){
                let vuelto = restar(pago, producto3.precio)

                alert("Compraste: " + producto3.nombre + "\n" + "su vuelto es: " + vuelto)
                alert("Gracias por su compra. Vuelvas prontos")
                break;
            }else{
                intentos++;
                if(intentos < maxIntentos){
                    alert("No alcanza, le faltan: $" + restar(producto1.precio, pago) + "\n" +
                        "Le quedan " + (maxIntentos - intentos) + " intento" + "\n" +
                        "Intente de nuevo")
                }
                else{
                    alert("se te acabaron los intentos. Chau")
                    break;
                }
                
            }
        }
        else if(compra===4){
            alert("Vuelvas prontos")
            break;      
        }
        else{
            alert("Numero incorrecto") 
        }
    }      
}


function app(){
    let contador = prompt("BIENVENIDO FARMACIA"+"\n" + "Elegir un numero" +"\n" + "1.Productos" +"\n" + "2.Salir")

    while(true){
        if(contador === "1"){
            
            mostrarProductos()
            break
        } 
        else if(contador === "2"){
            alert("Vuelvas prontos")
            break; 
        }
        else{
            alert("Numero incorrecto")
            contador = prompt("BIENVENIDO FARMACIA"+"\n" + "Elegir un numero" +"\n" + "1.Productos" +"\n" + "2.Salir")
        }
    }
}

// INICIA LA APP
app();



