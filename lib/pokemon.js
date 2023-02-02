// fetcher for useSWR
// fetch all about a pokemon [id] view
// to consume the api data
// see https://pokeapi.co/
export async function fetcherGetAllPokemonInfoById(pokemonUrl) {
  let pokemon = await fetch(pokemonUrl).then((res) => res.json());
  // array from pokemon.abilities links
  let abilities = [];
  // array filled by recursivity
  let evolutions = [];
  await pokemon.abilities.map(async (ability) => {
    let single = await fetch(ability.ability.url).then((res) => res.json());
    abilities.push(single);
  });
  // necesary to fill evolutions array
  let specie = await fetch(pokemon.species.url).then((res) => res.json());
  let evolveChain = await fetch(specie.evolution_chain.url).then((res) =>
    res.json()
  );

  const recursiveEvolutions = async (chain, name) => {
    let url = chain.species.url.replace("-species", "");
    let evolution = await fetch(url).then((res) => res.json());
    if (chain.species.name !== name) {
      evolutions.push(evolution);
    }
    if (chain.evolves_to.length > 0) {
      await recursiveEvolutions(chain.evolves_to[0], name);
    }
  };
  recursiveEvolutions(evolveChain.chain, pokemon.name);
  // if all is ok, return the data
  return { pokemon, abilities, specie, evolutions };
}

export async function fetchSingleItem(url) {
  let res = await fetch(url);
  return res.json();
}
export function fetchMultipleItems(abilitiesUrl) {
  const abilities = [];

  abilitiesUrl.map((url) => {
    const requestAbility = async () => {
      let res = await fetch(url.ability.url);
      let json = await res.json();
      abilities.push(json);
    };
    requestAbility();
  });
  return abilities;
}
export async function getEvolutions(evolveChain, name) {
  let evolutions = [];
  const recursive = async (evolveChain, name) => {
    let url = evolveChain.species.url.replace("-species", "");
    let res = await fetch(url);
    let json = await res.json();
    if (evolveChain.species.name !== name) {
      evolutions.push(json);
    }
    if (evolveChain.evolves_to.length > 0) {
      recursive(evolveChain.evolves_to[0], name);
    }
    return;
  };
  await recursive(evolveChain, name);
  // console.log(evolutions);
  return evolutions;
}
