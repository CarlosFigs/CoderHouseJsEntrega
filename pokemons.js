let allTeams = JSON.parse(localStorage.getItem("pokemonTeam")) || [];


const renderRandom = (arrayElementos) => {
    // Obtener el contenedor donde se mostrarán las tarjetas de los equipos
    let teamContainer = document.querySelector(".teamContainer");
    teamContainer.innerHTML = ""; // Limpiar contenido previo para evitar duplicados
    arrayElementos.forEach((equipo,teamIndex)=>{
        let teamDiv = document.createElement("div");
        teamDiv.className="teamDiv";
        // Iterar sobre cada equipo en el array y crear una tarjeta para cada Pokémon
        equipo.forEach((elemento,index) => {
                let pokeCard = document.createElement("div");
                pokeCard.className = "pokeCardRandom";
                pokeCard.innerHTML = `
                    <h2>${elemento.name.charAt(0).toUpperCase() + elemento.name.slice(1)}</h2>
                    <img src=${elemento.image} alt="${elemento.name}">
                    <ul>
                        <li><strong>Movimientos:</strong></li>
                        <li>${elemento.moveset[0].charAt(0).toUpperCase() + elemento.moveset[0].slice(1)}</li>
                        <li>${elemento.moveset[1].charAt(0).toUpperCase() + elemento.moveset[1].slice(1)}</li>
                        <li>${elemento.moveset[2].charAt(0).toUpperCase() + elemento.moveset[2].slice(1)}</li>
                        <li>${elemento.moveset[3].charAt(0).toUpperCase() + elemento.moveset[3].slice(1)}</li>
                    </ul>
                `;
                teamDiv.appendChild(pokeCard);
            });
            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Borrar team";
            deleteBtn.className = "deleteBtn";
            deleteBtn.addEventListener("click", () => deleteTeam(teamIndex));
            teamDiv.appendChild(deleteBtn);
            // agregar el dive de cada equipo al contenedor
            teamContainer.appendChild(teamDiv);
        });
    };
renderRandom(allTeams);

const deleteTeam = (index) => {
    // Eliminar el equipo del array
    Swal.fire({
        title: "Seguro quiere borrar el equipo?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#5F5F5F",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borrar",
        cancelButtonText:"Cancelar",
        background: "#4B0082",
        color:"#FFDD57",
    }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire({
            title: "Deleted!",
            text: "El equipo ha sido eliminado",
            icon: "success",
            background: "#4B0082",
            color:"#FFDD57",
            confirmButtonColor: "#5F5F5F",
        });
        allTeams.splice(index, 1);
        // Actualizar localStorage
        localStorage.setItem("pokemonTeam", JSON.stringify(allTeams));
        // Volver a renderizar los equipos actualizados
        renderRandom(allTeams);
        }
    });
};
