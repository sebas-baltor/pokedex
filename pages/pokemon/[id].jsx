import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from  "../../components/layout"
import Image from 'next/image';
// import {colorQuantization} from 'color-quantization'

export default function Pokemon (){
    const [pokemon,setPokemon] = useState(null);
    const router = useRouter();
    useEffect(()=>{
        (async()=>{
            let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${router.query.id}`);
            setPokemon(await res.json());
        })();
    })
    if(!pokemon){return <div className='bg-slate-300'>Cargando...</div>}
    return (
        <Layout>
        <div className='bg-slate-100 h-[100vh] pt-12 flex justify-center items-center'>
            <div className='grid grid-rows-2 grid-cols-2 w-full h-full m-2 rounded shadow'>
                {/* <Image src={pokemon.sprites.front_default} width={200} height={200}/> */}
                <img className='w-full m-auto' src={pokemon.sprites.front_default} alt={pokemon.name} />
                <div>
                    <span className='font-black'>{pokemon.name.toUpperCase()}</span>
                    <div><span>Base Experience: </span>{pokemon.base_experience} xp.</div>
                    <div><span>Height: </span>{parseInt(pokemon.height)/10} m.</div>
                    <div><span>Weight: </span>{parseInt(pokemon.weight)/10} kg.</div>
                </div>
            </div>
            
        </div>
        </Layout>
    )
}


