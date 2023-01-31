export function getByPage(){
    
}
export async function fetchSingleItem(url){
    let res = await fetch(url);
    return res.json();
}
export function fetchMultipleItems(abilitiesUrl){
    const abilities = [];
    
    abilitiesUrl.map(async url => {
        const res = await fetch(url.ability.url);
        abilities.push(res.json());
    });
    return abilities;
}