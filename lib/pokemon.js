export function getByPage(){
    
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
            // console.log(json);
        }
        requestAbility();
    });
    return abilities;
}
export async function getEvolutions(evolveChain,name){
    let evolutions = [];
    const recursive = async (evolveChain,name)=>{
        let res = await fetch(evolveChain.species.url);
        let json = await res.json();
        if(evolveChain.species.name !== name){
            evolutions.push(json);
        }
        if(evolveChain.evolves_to.length > 0){
            await getEvolutions(evolveChain.evolves_to[0],name);
        }
    }
    recursive(evolveChain,name);
    return evolutions;
}