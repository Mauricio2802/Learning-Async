const cardContainer = document.querySelector(".card-container"),
  closeContainer = document.getElementById("close-container");

const cardId = cardContainer.querySelector(".pokemon__id"),
  cardName = cardContainer.querySelector(".pokemon__name"),
  cardImage = cardContainer.querySelector(".pokemon__img"),
  cardTypesContainer = cardContainer.querySelector(".pokemon__type"),
  cardLegendary = cardContainer.querySelector(".pokemon__legendary"),
  cardHeight = cardContainer.querySelector(".additional__height"),
  cardWeight = cardContainer.querySelector(".additional__weight"),
  cardGenderMale = cardContainer.querySelector(".gender__male"),
  cardGenderFemale = cardContainer.querySelector(".gender__female"),
  cardAbout = cardContainer.querySelector(".about__content"),
  cardAbilitiesContainer = cardContainer.querySelector(".abilities-container"),
  cardEggGroupsContainer = cardContainer.querySelector(".egg-groups-container");

let cardStatsNumberArray = cardContainer.querySelectorAll(
  ".stat .stat__number"
);
cardStatsNumberArray = Array.from(cardStatsNumberArray);

console.log(pokedexChilds);

for (let i = 0; i < pokedexLength; i++) {
  pokedexChilds[i].addEventListener("click", function () {
    createPokemonCard(pokemonsIdArray[i]);
    openCard();
  });
}

closeContainer.addEventListener("click", closeCard);
document.addEventListener("click", function (e) {
  let click = e.target;
  if (click == cardContainer) {
    closeCard();
  }
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeCard();
  }
});

async function createPokemonCard(id) {
  const pokemon = await fetchData(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemonSpecies = await fetchData(pokemon.species.url);

  cardId.textContent = `#${elegantId(pokemon.id)}`;
  cardName.textContent = `${pokemon.species.name}`;

  let src;
  let imageUrl1 = pokemon.sprites.other.dream_world.front_default;
  let imageUrl2 = pokemon.sprites.other["official-artwork"].front_default;
  let imageUrl3 = pokemon.sprites.other.home.front_default;

  if (imageUrl1 !== null) {
    src = imageUrl1;
  } else if (imageUrl2 !== null) {
    src = imageUrl2;
  } else if (imageUrl3 !== null) {
    src = imageUrl3;
  }
  cardImage.setAttribute("src", src);

  let weightKg = pokemon.weight / 10;
  let heightMeters = pokemon.height / 10;
  cardHeight.textContent = `${heightMeters}m`;
  cardWeight.textContent = `${weightKg}kg`;

  let genRate = pokemonSpecies.gender_rate;
  if (genRate === -1) {
    let divGenderFemale = cardGenderFemale.parentNode;
    let pokemonGender = divGenderFemale.parentNode;

    pokemonGender.innerHTML = genderRate(genRate);
  } else if (Array.isArray(genderRate(genRate))) {
    let genderArray = genderRate(genRate);
    cardGenderMale.textContent = `${genderArray[0]}%`;
    cardGenderFemale.textContent = `${genderArray[1]}%`;
  }

  let aboutContent;
  for (let i in pokemonSpecies.flavor_text_entries) {
    if (pokemonSpecies.flavor_text_entries[i].language.name === "en") {
      aboutContent = pokemonSpecies.flavor_text_entries[i].flavor_text;
    }
  }

  let globalRegex1 = /\n/g;
  let globalRegex2 = /\f/g;
  aboutContent = aboutContent.replace(globalRegex1, " ");
  aboutContent = aboutContent.replace(globalRegex2, " ");

  cardAbout.textContent = aboutContent;

  let divType = document.createElement("div");
  cardTypesContainer.appendChild(divType);
  let type1 = pokemon.types[0].type.name;
  divType.classList.add("box", "type");

  divType.textContent = `${type1}`;
  backgroundType(divType);

  let type2;
  if (pokemon.types[1]) {
    let divType = document.createElement("div");
    cardTypesContainer.appendChild(divType);
    type2 = pokemon.types[1].type.name;
    divType.classList.add("box", "type");

    divType.textContent = `${type2}`;
    backgroundType(divType);
  }

  for (let i in pokemon.stats) {
    cardStatsNumberArray[i].textContent = `${pokemon.stats[i].base_stat}`;
  }
  console.log(pokemon.stats);

  let divAbility = document.createElement("div");
  cardAbilitiesContainer.appendChild(divAbility);
  let ability1 = pokemon.abilities[0].ability.name;
  divAbility.classList.add("box", "ability");

  ability1 = ability1.replace("-", " ");
  divAbility.textContent = `${ability1}`;

  let ability2;
  if (pokemon.abilities[1]) {
    let divAbility = document.createElement("div");
    cardAbilitiesContainer.appendChild(divAbility);
    ability2 = pokemon.abilities[1].ability.name;
    divAbility.classList.add("box", "ability");

    ability2 = ability2.replace("-", " ");
    divAbility.textContent = `${ability2}`;
  }

  let divEggGroup = document.createElement("div");
  cardEggGroupsContainer.appendChild(divEggGroup);
  let eggGroup1 = pokemonSpecies.egg_groups[0].name;
  divEggGroup.classList.add("box", "egg-group");

  eggGroup1 = eggGroup1.replace("-", " ");
  divEggGroup.textContent = `${eggGroup1}`;

  let eggGroup2;
  if (pokemonSpecies.egg_groups[1]) {
    let divEggGroup = document.createElement("div");
    cardEggGroupsContainer.appendChild(divEggGroup);
    eggGroup2 = pokemonSpecies.egg_groups[1].name;
    divEggGroup.classList.add("box", "egg-group");

    eggGroup2 = eggGroup2.replace("-", " ");
    divEggGroup.textContent = `${eggGroup2}`;
  }

  console.log(pokemon.types.length);
  if (pokemon.types.length === 1) {
    let uniqueType = cardTypesContainer.querySelector("div:nth-child(1)");
    uniqueType.style.marginRight = "0px";
  }
}

function closeCard() {
  bgCardContainer.classList.add("hidden");
  cardImage.setAttribute("src", "../src/silueta-pikachu.png");
  removeNodeChilds(cardTypesContainer);
  removeNodeChilds(cardAbilitiesContainer);
  removeNodeChilds(cardEggGroupsContainer);
}

function openCard() {
  bgCardContainer.classList.remove("hidden");
  console.log(this);
}