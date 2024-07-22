/* Planteamiento del proyecto
    Sera un e.commerce ERP en donde se venderan un listado de productos(8)
    los productos seran los  modulos del ERP algunos con precios similares y otros con precios iguales
    en donde la persona podra elegir si pagarlo en cuotas o decontado..
*/
let texto;
let venta = 0;
let mensaje = "Por favor ingresar un dato valido";
let newArray;
const productos = [
    {
        id: 1 ,
        nombre: "venta",
        precio :350
    },
    {
        id: 2 ,
        nombre: "compra",
        precio :350
    },
    {
        id: 3 ,
        nombre: "inventario",
        precio :200
    },
    {
        id: 4 ,
        nombre: "finanza",
        precio :300
    },
    {
        id: 5 ,
        nombre: "cooperativa",
        precio :600
    },
    {
        id: 6 ,
        nombre: "personal",
        precio :400
    },
    {
        id: 7 ,
        nombre: "contabilidad",
        precio :400
    },
    {
        id: 8 ,
        nombre: "hospital",
        precio :800
    },
    {
        id: 9 ,
        nombre: "todos",
        precio: 0
    },
];
const intereses =[
    {
        cuota: 3,
        porcentaje:1.1
    },
    {
        cuota: 6,
        porcentaje:1.15
    },
    {
        cuota: 9,
        porcentaje:1.18
    },
    {
        cuota: 12,
        porcentaje:1.2
    },
]



alert("Bienevenidos a X");

texto = prompt(`Desea comprar? (si o no)`);
texto.toLowerCase();
while(texto !== "si"){
    alert(`Entiendo vuelva pronto`)
    texto = prompt(`Ahora desea comprar? (si o no)`)
    texto.toLowerCase();
}
if(texto === "si"){
    alert(`Estos son nuestros productos mas economicos`)
    newArray = productos.filter((elemento)=>{
        return elemento.precio < 400 && elemento.precio > 0;
    })
    newArray.forEach((elemento)=> alert(`Modulo de: ${elemento.nombre} y precio ${elemento.precio}`))
    respuesta = prompt(`Los modulos que tenemos a la venta son: 
        ${productos[0].nombre} con un valor de ${productos[0].precio}$
        ${productos[1].nombre} con un valor de ${productos[1].precio}$
        ${productos[2].nombre} con un valor de ${productos[2].precio}$
        ${productos[3].nombre} con un valor de ${productos[3].precio}$
        ${productos[4].nombre} con un valor de ${productos[4].precio}$
        ${productos[5].nombre} con un valor de ${productos[5].precio}$
        ${productos[6].nombre} con un valor de ${productos[6].precio}$
        ${productos[7].nombre} con un valor de ${productos[7].precio}$
        Deseas adquirir algun producto? (si o no)`);
        respuesta.toLowerCase();
        while(respuesta ==="si"){
            let nombreProducto = prompt(`Que producto deseas adquirir?
                ${productos[0].nombre} - ${productos[1].nombre} - ${productos[2].nombre} - ${productos[3].nombre} - ${productos[4].nombre} - ${productos[5].nombre} - ${productos[6].nombre} - ${productos[7].nombre} - ${productos[8].nombre}`);
                nombreProducto.toLowerCase();
                if(nombreProducto === productos[8].nombre){
                    total = productos.reduce((acc,producto)=>{return acc + producto.precio},0);
                    venta = total;
                }
                let productoEncontrado = productos.find((producto)=> nombreProducto === producto.nombre);
                let precioProducto = productoEncontrado.precio;
                let calculoVenta = (precioProducto)=>{
                    return venta += precioProducto;
                }
                let restaVenta = (precioProducto)=>{
                    return venta -= precioProducto;
                }
                calculoVenta(precioProducto);
                consulta = prompt(`Deseas quitar el producto agregado? (si o no)`)
                if(consulta === "si"){
                    restaVenta(precioProducto)
                }
                respuesta = prompt(` Deseas comprar otro? (si o no)`);
        }// aqui termina el while

        if(venta !== 0){
                texto = prompt(`Perfecto el monto total de su compra es de ${venta} desea continuar?`);
                texto.toLowerCase();
            if(texto === "si"){
                respuesta = prompt(`desea colocar en cuotas su venta? (si o no)`);
                respuesta.toLowerCase();
                if(respuesta === "no"){
                    console.log(`perfecto puede pasar por el carrito de compra para efectuar el pago de ${venta}$`);
                }else if (respuesta === "si"){
                    cuotas = Number(prompt(`En cuantas cuotas desea colocarlas? opciones:(3 - 6 - 9 - 12)`));
                        let calculoCuotas = (cuotas, porcentaje)=>{
                            return (venta/cuotas)* porcentaje;
                        }
                        if(cuotas === 3){
                            let resultadoTotal = calculoCuotas(cuotas,intereses[0].porcentaje);
                            alert(`Sus cuotas quedaron en 3 cuotas de ${resultadoTotal}$ con intereses incluidos`);
                        }else if(cuotas === 6){
                            let resultadoTotal = calculoCuotas(cuotas,intereses[1].porcentaje);
                            alert(`Sus cuotas quedaron en 6 cuotas de ${resultadoTotal}$ con intereses incluidos`);
                        }else if(cuotas === 9){
                            let resultadoTotal = calculoCuotas(cuotas,intereses[2].porcentaje);
                            alert(`Sus cuotas quedaron en 9 cuotas de ${resultadoTotal}$ con intereses incluidos`);
                        }else if(cuotas === 12){
                            let resultadoTotal = calculoCuotas(cuotas,intereses[3].porcentaje);
                            alert(`Sus cuotas quedaron en 12 cuotas de ${resultadoTotal}$ con intereses incluidos`);
                        }else{
                            alert(mensaje);
                        }
                }else{
                    alert(mensaje);
                }
            }else if (texto === "no"){
                console.log(`ok su venta ha sido cancelada`);
            }else{
                alert(mensaje);
            }
        }else{
            venta = 0
            console.log(`Su venta ha sido cancelada, precio de venta = ${venta}$`);
            alert("Gracias por su compra");
        }
    }//aqui termina el if


