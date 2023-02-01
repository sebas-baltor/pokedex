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