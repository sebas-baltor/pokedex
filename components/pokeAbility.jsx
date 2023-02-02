export default function PokeAbility ({ability}){
    return (
        <div>
            <h5 className="w-full text-center font-black">{ability.name.toUpperCase()}</h5>
            {ability.effect_entries.map(entry=>{
                if(entry.language.name === "en"){
                    return <p className="max-h-24 overflow-hidden">{entry.effect}</p>
                }
            })}
        </div>
    )
}