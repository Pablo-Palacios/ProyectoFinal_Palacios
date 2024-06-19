
const jsonMonedas = {
    "list":
    [
        {
            "dolar_blue": "",
            "euro":"",
            "real":""
        }
    ]
}


fetch("https://dolarapi.com/v1/dolares/blue")
.then(response => response.json())
.then(data => {
    jsonMonedas.list[0].dolar_blue = parseInt(`${data.venta}`)
    console.log(jsonMonedas.list)
})

fetch("https://dolarapi.com/v1/cotizaciones/eur")
  .then(response => response.json())
  .then(data => 
    {
        jsonMonedas.list[0].euro = parseInt(`${data.venta}`)
        
    }
  );

fetch("https://dolarapi.com/v1/cotizaciones/brl")
  .then(response => response.json())
  .then(data => {
    jsonMonedas.list[0].real = parseInt(`${data.venta}`)
  });





