import useSWR from 'swr';
export function getByPage(){
    
}
export function getPokemonInfo(pokemonUrl){
    
}
export async function fetchSingleItem(url){
    let res = await fetch(url);
    return res.json();
}
export function fetchMultipleItems(abilitiesUrl){
    const abilities = [];
    
    abilitiesUrl.map(url => {
        const requestAbility = async()=>{
            let res = await fetch(url.ability.url);
            let json = await res.json();
            abilities.push(json);
        }
        requestAbility();
    });
    return abilities;
}
export async function getEvolutions(evolveChain,name){
    let evolutions = [];
    const recursive = async (evolveChain,name)=>{
        let url = evolveChain.species.url.replace("-species","");
        let res = await fetch(url);
        let json = await res.json();
        if(evolveChain.species.name !== name){
            evolutions.push(json);
        }
        if(evolveChain.evolves_to.length > 0){
            recursive(evolveChain.evolves_to[0],name);
        }
        return
    }
    await recursive(evolveChain,name);
    // console.log(evolutions);
    return evolutions;
}