/* Planteamiento del proyecto
    Sera un e.commerce ERP en donde se venderan un listado de productos(8)
    los productos seran los  modulos del ERP algunos con precios similares y otros con precios iguales
    en donde la persona podra elegir si pagarlo en cuotas o decontado..
*/
//variables globales
let texto;
let producto1 = "venta" ;
let producto2 = "compra" ;
let producto3 = "inventario" ;
let producto4 = "finanza" ;
let producto5 = "cooperativa" ;
let producto6 = "personal" ;
let producto7 = "contabilidad" ;
let producto8 = "hospital" ;
let producto9 = "todos";

let precio1 = 350; 
let precio2 = 350;
let precio3 = 200;
let precio4 = 300;
let precio5 = 600;
let precio6 = 400;
let precio7 = 400;
let precio8 = 800;
let venta = 0;

let interes3 = 1.1;
let interes6 = 1.15;
let interes9 = 1.18;
let interes12 = 1.2;
let mensaje = alert(`Por favor ingresar un dato valido`);


alert("Bienevenidos a X");

texto = prompt(`Desea comprar?`);
texto.toLowerCase();
while(texto !== "si"){
    alert(`Entiendo vuelva pronto`)
    texto = prompt(`Ahora desea comprar?`)
    texto.toLowerCase();
}
if(texto === "si"){
    alert(`Los modulos que tenemos a la venta son: 
        ${producto1} con un valor de ${precio1}$
        ${producto2} con un valor de ${precio2}$
        ${producto3} con un valor de ${precio3}$
        ${producto4} con un valor de ${precio4}$
        ${producto5} con un valor de ${precio5}$
        ${producto6} con un valor de ${precio6}$
        ${producto7} con un valor de ${precio7}$
        ${producto8} con un valor de ${precio8}$`);
        respuesta = prompt(`Deseas adquirir algun producto? `);
        respuesta.toLowerCase();
        while(respuesta ==="si"){
            let producto = prompt(`Que producto deseas adquirir?
                venta - compra - inventario - finanza - cooperativa - personal - contabilidad -  hospital - todos`);
                producto.toLowerCase();
                let calculoVenta = (producto)=>{
                    switch(producto){
                        case "venta":                        
                            return venta +=precio1;
                        case "compra":
                            return venta +=precio2;
                        case "inventario":
                            return venta +=precio3;
                        case "finanza":
                            return venta +=precio4;
                        case "cooperativa":
                            return venta +=precio5;
                        case "personal":
                            return venta +=precio6;
                        case "contabilidad":
                            return venta +=precio7;
                        case "hospital":
                            return venta +=precio8;
                        case "todos":
                            return venta = precio1 + precio2 +  precio3 + precio4 + precio5 + precio6 + precio7 + precio8;
                        default:
                            return 0;
                    }
                }
                calculoVenta(producto);
                respuesta = prompt(`deseas comprar otro producto?`);
        }// aqui termina el while
        if(venta !== 0){
            texto = prompt(`Perfecto el monto total de su compra es de ${venta}$ desea continuar?`);
            texto.toLowerCase();
            if(texto === "si"){
                respuesta = prompt(`desea colocar en cuotas su venta? (si o no)`);
                respuesta.toLowerCase();
                if(respuesta === "no"){
                    console.log(`perfecto puede pasar por el carrito de compra para efectuar el pago de ${venta}$`);
                }else if (respuesta === "si"){
                    cuotas = Number(prompt(`En cuantas cuotas desea colocarlas? opciones:
                        (3 - 6 - 9 - 12)`));
                        let calculoCuotas = (cuotas)=> venta = venta/cuotas;
                        if(cuotas === 3){
                            let resultadoTotal = calculoCuotas(cuotas) * interes3;
                            alert(`Sus cuotas quedaron en 3 cuotas de ${resultadoTotal}$ con intereses incluidos`);
                        }else if(cuotas === 6){
                            let resultadoTotal = calculoCuotas(cuotas) *interes6;
                            alert(`Sus cuotas quedaron en 6 cuotas de ${resultadoTotal}$ con intereses incluidos`);
                        }else if(cuotas === 9){
                            let resultadoTotal = calculoCuotas(cuotas) *interes9;
                            alert(`Sus cuotas quedaron en 9 cuotas de ${resultadoTotal}$ con intereses incluidos`);
                        }else if(cuotas === 12){
                            let resultadoTotal = calculoCuotas(cuotas) * interes12
                            alert(`Sus cuotas quedaron en 12 cuotas de ${resultadoTotal}$ con intereses incluidos`);
                        }else{
                            mensaje;
                        }
                }else{
                    mensaje;
                }
            }else if (texto === "no"){
                console.log(`ok su venta ha sido cancelada`);
            }else{
                mensaje;
            }
        }else{
            venta = 0
            console.log(`Su venta ha sido cancelada, precio de venta = ${venta}$`);
        }
    }//aqui termina el if
console.log("Gracias por su compra");
