let productos=[
    {
        id: 1,
        tittle: "Venta",
        description:"Poderosas interfaces procesan el intercambio de documentos con los clientes, junto a una serie de herramientas para apoyar la fuerza de ventas",
        img: "https://placehold.co/200x200",
        price:300,
    },
    {
        id: 2,
        tittle: "Compra",
        description:"Desde compras y gastos nacionales, reposiciones de caja, liquidación de importaciones, consolidaciones de carga en múltiples monedas y más",
        img: "https://placehold.co/200x200",
        price:300,
    },
    {
        id: 3,
        tittle: "Inventario",
        description:"Gestión de la mercancía ubicada en distintos almacenes sectorizados y diversas funciones para el control y levantamiento periódico de inventario",
        img: "https://placehold.co/200x200",
        price:200,
    },
    {
        id: 4,
        tittle: "Finanza",
        description:"Cuentas bancarias, cajas y otras entidades con las que se liquidan compras, ventas, nóminas y cooperativas. Conciliación e impresión de cheques",
        img: "https://placehold.co/200x200",
        price:400,
    },
    {
        id: 5,
        tittle: "Cooperativa",
        description:"Configure los préstamos, aportes y ahorros de socios de diversos grupos, calcule y distribuya automáticamente los dividendos a final de año",
        img: "https://placehold.co/200x200",
        price:1000,
    },
    {
        id:6,
        tittle: "Personal",
        description:"Automatice sus nóminas y otros pagos con las exigencias de la ley y de su empresa, generando archivos para bancos e institutos gubernamentales",
        img: "https://placehold.co/200x200",
        price:300,
    },
    {
        id: 7,
        tittle: "Contabilidad",
        description:"Registro contables manuales y automáticos generados por una interfaz con los demás módulos, permitiendo obtener estados financieros al día",
        img: "https://placehold.co/200x200",
        price:500,
    },
    {
        id: 8,
        tittle: "Hospital",
        description:"Hospitalización, historial clínico de los pacientes, control de alquiler de consultorios, manejos de inventarios por camas, entre otras funciones",
        img: "https://placehold.co/200x200",
        price:1000,
    },
    {
        id: 9,
        tittle: "Financiera",
        description:"Registro de tasaciones, solicitudes, contratos, cuotas bajo distintos tipos de intereses, cálculo de mora, gastos administrativos/legales.",
        img: "https://placehold.co/200x200",
        price:800,
    }
];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


const renderProducts = (arrayElementos)=>{
    // Primero lo que se hace es obtener el elemento del HTML en este caso es un div para Tarjetas
    let productContainer = document.querySelector(".productContainer");
    if(productContainer === null){
        return console.log(`El elemento que estas indicando no existe.`);
    }
    productContainer.innerHTML = "";
    //Se limpia el contenido del elemento asignadole unos strings vacios.. para evitar duplicado del contenido
    arrayElementos.forEach((elemento) => {
        // se realizara un for each para cada elemento del "array" que estemos pasando como parametro para poder "crear" para cada elemento un nuevo div que contenga lo que necesitemos.. en este caso elementos para una tarjeta..
        let productCard = document.createElement("div");
        productCard.className = "productCard";
        productCard.innerHTML= `
            <h2>${elemento.tittle}</h2>
            <img src=${elemento.img}/>
            <p>${elemento.description}</p>
            <p class="precioTarjeta">$${elemento.price}</p>
            <button onclick = "agregarAlCarrito(${elemento.id})">Agregar</button>`;
            //importante en esto.. al buton pasamos y creamos directo el evento ya que se esta creando por un createElement y no existe dentro del HTML principal. 
        //luego de crear la tarjeta debemos incluirla dentro del contendor principal con un appendchild al CONTENEDOR dla tarjeta.
        productContainer.appendChild(productCard)
    });
};
const agregarAlCarrito = (id)=>{
    let producto = productos.find((elemento)=> elemento.id === id)
    let productoCart = carrito.find((elemento)=>elemento.id===id);
    if(productoCart){
        productoCart.quantity ++;
        localStorage.setItem("carrito",JSON.stringify(carrito))
    }else{
        carrito.push({...producto, quantity:1});
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
}
renderProducts(productos);

const filtrar = ()=>{
    const inputBusqueda = document.getElementById(`inputSearch`);
        valor = inputBusqueda.value.toLowerCase();
        const arrayfiltrado = productos.filter((producto)=>producto.tittle.toLowerCase().includes(valor));
    renderProducts(arrayfiltrado)
}
const butonBusqueda = document.getElementById("search");
butonBusqueda.addEventListener("click",filtrar );