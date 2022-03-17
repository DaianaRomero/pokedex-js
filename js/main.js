const pokemonContainer = document.querySelector(".pokemon-container");
const spinner = document.querySelector("#spinner");
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");

let offset = 1;
let limit = 8;

previous.addEventListener("click", () => {
    if (offset != 1){
    offset -=9;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset,limit);
}
})
next.addEventListener("click", () => {
    offset +=9;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset,limit);
})

//function fetchPokemon(id){
   // fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
   // .then(respuesta=>respuesta.json())
   // .then(data => console.log(data))
//}

//fetchPokemon(1);

function fetchPokemon(id){ //trae y crea 1 pokemon segun id
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((respuesta)=>respuesta.json())
    .then((data) => 
        {createPokemon(data);
            spinner.style.display ="none";
        })
}



function fetchPokemons(offset,limit){ //crea x cantidad de pokemon
for (let i = offset; i <= offset + limit; i++) {
    spinner.style.display ="block";
    fetchPokemon(i);
    
}
}


//fetchPokemons(9);

function createPokemon(pokemon){

    const flipCard =document.createElement("div");//contenedor general
    flipCard.classList.add("flip-card");
    const cardContainer =document.createElement("div");
    cardContainer.classList.add("card-container");
    flipCard.appendChild(cardContainer);


    const card = document.createElement("div"); //tarjeta que lo va a contener
    card.classList.add("pokemon-block")
    const spriteContainer = document.createElement("div"); //el que contiene la imagen
    spriteContainer.classList.add("img-container");
    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default; //imsgrn de frente que esta en la api
    spriteContainer.appendChild(sprite);
    const number = document.createElement("p");
    number.textContent = `#${pokemon.id.toString().padStart(3,0)}`;  //padstar añade ceros al primcipio
    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = pokemon.name;


    card.appendChild(spriteContainer);//imagen
    card.appendChild(number);//numero
    card.appendChild(name);//nombre
    
//la parte de atras de la carta
    const cardBack = document.createElement("div")
    cardBack.classList.add("pokemon-block-back")
    cardBack.appendChild(progressBars(pokemon.stats));
    
    cardBack.appendChild(especialidad(pokemon.types));
    
    cardContainer.appendChild(card)
    cardContainer.appendChild(cardBack)
    pokemonContainer.appendChild(flipCard);


}

function removeChildNodes(parent){ //remueve elementos dentro de otro elemento
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}

function progressBars(stats) {
    const statsContainer = document.createElement("div");
    statsContainer.classList.add("stats-container");
  
    for (let i = 0; i < 3; i++) {
      const stat = stats[i];
  
      const statPercent = stat.base_stat / 2 + "%";
      const statContainer = document.createElement("stat-container");
      statContainer.classList.add("stat-container");
  
      const statName = document.createElement("p");
      statName.classList.add("text-uppercase")
      statName.textContent = stat.stat.name;
  
      const progress = document.createElement("div");
      progress.classList.add("progress");
  
      const progressBar = document.createElement("div");
      progressBar.classList.add("progress-bar");
      progressBar.setAttribute("aria-valuenow", stat.base_stat);
      progressBar.setAttribute("aria-valuemin", 0);
      progressBar.setAttribute("aria-valuemax", 200);
      progressBar.style.width = statPercent;
  
      progressBar.textContent = stat.base_stat;
  
      progress.appendChild(progressBar);
      statContainer.appendChild(statName);
      statContainer.appendChild(progress);
  
      statsContainer.appendChild(statContainer);
    }
  
    return statsContainer;
  }


  function especialidad(types) {
    const typesContainer = document.createElement("div");
    typesContainer.classList.add("types-container");
  
    
 
    for (let i = 0; i < types.length; i++) {
      const type = types[i];
  
      
  
      const typeName = document.createElement("span");
      typeName.classList.add("especialidad");
      

      typeName.textContent = type.type.name;
  
     
      
      
      typesContainer.appendChild(typeName);
    }
  
    return typesContainer;
  }



fetchPokemons(offset,limit);