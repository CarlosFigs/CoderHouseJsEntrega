let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const formContacto = document.getElementById("formContacto");
    formContacto.addEventListener("submit",(e)=>{e.preventDefault();})
const renderProducts = (arrayElementos)=>{
    // Primero lo que se hace es obtener el elemento del HTML en este caso es un div para Tarjetas
    let cartContainer = document.querySelector(".cartContainer");
    if(cartContainer === null){
        return console.log(`El elemento que estas indicando no existe.`);
    }
    cartContainer.innerHTML = "";
    //Se limpia el contenido del elemento asignadole unos strings vacios.. para evitar duplicado del contenido
    arrayElementos.forEach((elemento) => {
        // se realizara un for each para cada elemento del "array" que estemos pasando como parametro para poder "crear" para cada elemento un nuevo div que contenga lo que necesitemos.. en este caso elementos para una tarjeta..
        let productCard = document.createElement("div");
        productCard.className = "productCard";
        productCard.innerHTML= `
            <h2>${elemento.tittle}</h2>
            <img src=${elemento.img}/>
            <div class="botonesTarjeta">
            <button onclick = "restarAlCarrito(${elemento.id})">-</button>
            <p>${elemento.quantity}</p>
            <button onclick = "sumarAlCarrito(${elemento.id})">+</button>          
            </div>
            <p class="precioTarjeta">Precio: $${elemento.price*elemento.quantity}</p>`;
            //importante en esto.. al buton pasamos y creamos directo el evento ya que se esta creando por un createElement y no existe dentro del HTML principal. 
        //luego de crear la tarjeta debemos incluirla dentro del contendor principal con un appendchild al CONTENEDOR dla tarjeta.
        cartContainer.appendChild(productCard)
    });
};
renderProducts(carrito);

const sumarAlCarrito = (id)=>{
    let productoEncontrado = carrito.find((elemento)=>elemento.id === id);
    if(productoEncontrado){
        productoEncontrado.quantity +=1;
        localStorage.setItem("carrito",JSON.stringify(carrito));
        actualizarPago();
        renderProducts(carrito);
    }
};
const restarAlCarrito = (id)=>{
    let productoEncontrado = carrito.find((elemento)=>elemento.id === id);
    if(productoEncontrado && productoEncontrado.quantity > 1){
        productoEncontrado.quantity --;
        localStorage.setItem("carrito",JSON.stringify(carrito));
        actualizarPago();
        renderProducts(carrito);
        
    }else if(productoEncontrado && productoEncontrado.quantity === 1){
        eliminarDelCarrito(productoEncontrado.id);
        actualizarPago();
    }
};
const eliminarDelCarrito = (id)=>{
    carrito = carrito.filter((elemento)=>{return elemento.id !== id });
    localStorage.setItem("carrito",JSON.stringify(carrito));
    renderProducts(carrito);
};

const actualizarPago = ()=>{
    const infoMontoForm = document.getElementById("infoMontoForm");
    infoMontoForm.innerText= `Monto a pagar: ${carrito.reduce((acc,elemento)=>{return acc+(elemento.price*elemento.quantity)},0)}`
}    
actualizarPago();