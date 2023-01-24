import Link from "next/link"
export default function PokeCard({pokemon}){
    return (
        <Link href={`./pokemon/${pokemon.id}`} className="bg-sky-100 hover:bg-cyan-100 rounded-md p-1 m-2 flex flex-col justify-between items-center">
            <img src={pokemon.sprites.front_default} alt="" />
            <div className="font-bold">{pokemon.name.toUpperCase()}</div>
            <div className="flex justify-between">
                {pokemon.types.map((type) => {
                    return <span key={type.slot}>{type.type.name}</span>
                })}
            </div>
        </Link>
    )
}