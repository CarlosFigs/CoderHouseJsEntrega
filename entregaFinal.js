let count =1025;
let start=1;
const paginas =20;
let team =[];
let allTeams= JSON.parse(localStorage.getItem("pokemonTeam"))||[];


//SOLICITUD AL FETCH
const pokemonInfo = async (id) => {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const info = await resp.json();
    return info;
};
// GENERAR POKEMONS RANDOM
const pokemonRandom = async (id)=>{ // ESTO GENERA UN POKEMON RANDOM CON 4 ATAQUES
    document.getElementById("agregar").style.display= 'none';
    const pokemon = await pokemonInfo(id)
    const moves = pokemon.moves;
    const info = movimientosRandom(moves,4); 
    const pokemonRandom=[];
    pokemonRandom.push({name:pokemon.name,
        image:pokemon.sprites.front_default,
        moveset:info});
    renderRandom(pokemonRandom);

};
const equipoRandom = async ()=>{// ESTO GENERA UN EQUIPO DE 6 POKEMONS RANDOM CON 4 MOVIMIENTOS
    team =[];
    const multiplesID = new Set();
    while(team.length <6){
        const randomId = Math.floor(Math.random() * count) + 1;
        if(multiplesID.has(randomId))continue;
        const pokemon = await pokemonInfo(randomId);
        const moves = movimientosRandom(pokemon.moves,4);
        team.push({
            name:pokemon.name,
            image:pokemon.sprites.front_default,
            moveset:moves,
        });
        multiplesID.add(randomId);
    }
    renderRandom(team);
    document.getElementById("agregar").style.display= 'block';
    allTeams.push(team);    
};
const movimientosRandom = (moves,cantidad)=>{//ESTO GENERA MOVIMIENTOS RANDOM.. PARA POKEMONS INDIVIDUALES Y EQUIPO
    const moveSet=[];
    const elegirMoveSet=[...moves];
    for(let i = 0 ; i < cantidad && elegirMoveSet.length >0 ; i++ ){
        const numRandom = Math.floor(Math.random()*elegirMoveSet.length)
        moveSet.push(elegirMoveSet[numRandom].move.name);
        elegirMoveSet.splice(numRandom,1)
    }
    return moveSet;
};
// FUNCION PARA MOSTRAR SPRITE DE 20 POKEMONS DE LA POKEDEX
const mostrarPokemones = async (start) => {
    const pokemonsImagenes=[];
    const end = Math.min(start + paginas - 1, count);
    for (let id = start; id <=end ; id++) { // Cambia el rango de IDs según lo que desees mostrar
        if(id<=count && id>0){
            const pokemon = await pokemonInfo(id);
            pokemonsImagenes.push(pokemon); // Guarda el sprite en la lista
        }
    }
    render(pokemonsImagenes);
    
}

//RENDERS
const  render = (arrayElementos)=>{// ESTE RENDER SE UTILIZA PARA EL LLENADO GENERAL DE LOS SPRITES DE LOS POKEMONES
    // Primero lo que se hace es obtener el elemento del HTML en este caso es un div para Tarjetas
    let pokeContainer = document.querySelector(".pokeContainer");
    pokeContainer.innerHTML = "";
    //Se limpia el contenido del elemento asignadole unos strings vacios.. para evitar duplicado del contenido
    arrayElementos.forEach((elemento) => {
        // se realizara un for each para cada elemento del "array" que estemos pasando como parametro para poder "crear" para cada elemento un nuevo div que contenga lo que necesitemos.. en este caso elementos para una tarjeta..
        let pokeCard = document.createElement("div");
        pokeCard.className = "pokeCard";
        pokeCard.innerHTML= `
        <h3>${elemento.name.charAt(0).toUpperCase() + elemento.name.slice(1)}</h3>
        <img src=${elemento.sprites.front_default}>
        `;
        pokeContainer.appendChild(pokeCard)
    });
};
const  renderRandom = (arrayElementos)=>{// ESTE RENDER SE UTILIZA PARA LA CREACION DE POKEMONES RANDOM CON ATAQUES
    // Primero lo que se hace es obtener el elemento del HTML en este caso es un div para Tarjetas
    let pokeContainer = document.querySelector(".pokeContainer2");
    pokeContainer.innerHTML = "";
    //Se limpia el contenido del elemento asignadole unos strings vacios.. para evitar duplicado del contenido
    arrayElementos.forEach((elemento) => {
        // se realizara un for each para cada elemento del "array" que estemos pasando como parametro para poder "crear" para cada elemento un nuevo div que contenga lo que necesitemos.. en este caso elementos para una tarjeta..
        let pokeCard = document.createElement("div");
        pokeCard.className = "pokeCardRandom";
        pokeCard.innerHTML= `
        <h3>${elemento.name.charAt(0).toUpperCase() + elemento.name.slice(1)}</h3>
        <img src=${elemento.image}>
        <ul>
        <li><strong>Movimientos:</strong></li>
        <li>${elemento.moveset[0].charAt(0).toUpperCase() + elemento.moveset[0].slice(1)}</li>
        <li>${elemento.moveset[1].charAt(0).toUpperCase() + elemento.moveset[1].slice(1)}</li>
        <li>${elemento.moveset[2].charAt(0).toUpperCase() + elemento.moveset[2].slice(1)}</li>
        <li>${elemento.moveset[3].charAt(0).toUpperCase() + elemento.moveset[3].slice(1)}</li>
        </ul>
        `;
        pokeContainer.appendChild(pokeCard);
    });
};
const renderPokedex = (arrayElementos)=>{// ESTE RENDER SE UTILIZA PARA EL FILTRO DE BUSQUEDA
    document.getElementById("agregar").style.display= 'none';
    // Primero lo que se hace es obtener el elemento del HTML en este caso es un div para Tarjetas
    let pokeContainer = document.querySelector(".pokeContainer");
    pokeContainer.innerHTML = "";
    //Se limpia el contenido del elemento asignadole unos strings vacios.. para evitar duplicado del contenido
    arrayElementos.forEach((elemento) => {
        // se realizara un for each para cada elemento del "array" que estemos pasando como parametro para poder "crear" para cada elemento un nuevo div que contenga lo que necesitemos.. en este caso elementos para una tarjeta..
        let pokeCard = document.createElement("div");
        pokeCard.className = "pokedex";
        pokeCard.innerHTML= `
        <h3>${elemento.name.charAt(0).toUpperCase() + elemento.name.slice(1)}</h3>
        <div>
        <div class ="div-imagen">
        <img src=${elemento.sprites.front_default}>
        <h4>${elemento.types.map(atributo => atributo.type.name.toUpperCase()).join(` , `)}</h4>
        </div>
        <div class ="div-imagen">
        <img src=${elemento.sprites.front_shiny}>
        <h4>${elemento.types.map(atributo => atributo.type.name.toUpperCase()).join(` , `)}</h4>
        </div>
        </div>
        `;
        pokeContainer.appendChild(pokeCard);
    });
};

//  BOTONES DEL PROYECTO
// const buttonTosti = document.getElementById("toastify");
// buttonTosti.addEventListener("click", ()=>{
//     Toastify({
//     text: "Su equipo se ha añadido",
//     duration: 2000, // 3 segundos
//     position: "right",
//     gravity:"bottom",
//     style:{
//         color: "#ffffff",// Blanco
//         background: "linear-gradient(to right, #FFDD57,#4B0082)", // Degradado de fondo
//     },
// })
// .showToast();
// });
const botonEquipo = document.getElementById("equipo");      //BOTON PARA GENERA 1 EQUIPO DE 6 RANDOM
    botonEquipo.addEventListener("click",()=>{
        equipoRandom();
        const dato = "Aqui has generado un equipo para pelear"
        tosty(dato);
    });
const botonRandom = document.getElementById("random");
    botonRandom.addEventListener("click",()=>{              //BOTON PARA GENERAR 1 POKEMON RANDOM
        const randomId = Math.floor(Math.random() * count) + 1;
        pokemonRandom(randomId);
        const dato = "Un pokemon salvaje ha aparecido."
        tosty(dato);
        
    });
const botonAumento = document.getElementById("adelantar");
    botonAumento.addEventListener("click",()=>{         //BOTON PARA GENERAR 20 SPRITES DE POKEMONS DE MANERA ASCENDENTE
    mostrarPokemones(start)
    start +=paginas;
    const dato = "Siguientes 20 pokemones de la pokedex"
    tosty(dato);
    
} );
const botonRetroceso = document.getElementById("retroceso");
    botonRetroceso.addEventListener("click",()=>{       //BOTON PARA GENERAR 20 SPRITES DE POKEMONES DE MANERA DESCENDENTE
        if(start > 0 ){
            start-=paginas;
            mostrarPokemones(start);
            const dato = "Has retrocedido 20 pokemones de la pokedex"
            tosty(dato);
        }else{
            if(start <0){
                const dato ="No puedes retroceder mas del pokemon 1";
                tosty(dato);
                start=1;
            }
        }
    });
const botonAgregar = document.getElementById("agregar");
    botonAgregar.addEventListener("click",()=>{         //BOTON PARA AGREGAR AL LOCAL STORAGE EL EQUIPO DE 6
        agregarEquipo();
        const dato = "Su equipo ha sido agregado"
        tosty(dato);
    });
    const botonBuscar = document.getElementById("buscar");
    botonBuscar.addEventListener("click",()=>{          //BOTON PARA BUSCAR EN EL INPUT EL POKEMON A ENCONTRAR
        filtrar();  
    });
//  AQUI FINALIZAN LOS BOTONES DEL PROYECTO

// FUNTION TOSTY
const tosty = (text)=>{
    Toastify({
        text: text,
        duration: 2000, // 3 segundos
        position: "right",
        gravity:"bottom",
        style:{
            color: "#ffffff",// Blanco
            background: "linear-gradient(to right, #4B0082,#000000)", // Degradado de fondo
        },
    })
    .showToast();
}
//ESTA FUNCION AGREGA EL EQUIPO AL LOCAL STORE
const agregarEquipo = ()=>{
    const teamJson = JSON.stringify(allTeams);
    if(teamJson){
        localStorage.setItem("pokemonTeam",teamJson);
    }

};
// ESTA FUNCION ES LA QUE SE USA PARA FILTRAR AL POKEMON EN EL INPUT
const filtrar = async ()=>{
    const inputBusqueda = document.getElementById(`inputSearch`);
        valor = inputBusqueda.value.toLowerCase();
        try {
            const pokemonFiltrado = await pokemonInfo(valor);
            const pokemon = [];
            pokemon.push(pokemonFiltrado);
            console.log(pokemon);
            renderPokedex(pokemon);
            inputBusqueda.value = "";
            const dato = `Ha encontrado a ${valor}`;
            tosty(dato);
        } catch (error) {
            const dato = "El nombre que ingreso no es un pokemon"
            tosty(dato);        
        }


    
}

