export default function PokeMoves ({move}){
    return (
        <div>
            <h5 className="w-full text-center">{move.name}</h5>
            {move.effect_entries.map(entry=>{
                if(entry.language.name === "en"){
                    return <p className="max-h-12">{entry.effect}</p>
                }
            })}
        </div>
    )
}