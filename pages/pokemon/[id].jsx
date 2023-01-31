import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  AiOutlineColumnHeight,
  AiOutlineDotChart,
  AiFillHeart,
  AiFillStar,
} from "react-icons/ai";
import { GiWeight } from "react-icons/gi";
import { RiSwordFill, RiShieldStarFill, RiShieldFill } from "react-icons/ri";
import { BiRun } from "react-icons/bi";
import Layout from "../../components/layout";
import colorQuantization from "../../hook/colorQuantization";
// import {colorQuantization} from 'color-quantization'

export default function Pokemon() {
  const [pokemon, setPokemon] = useState(null);
  const router = useRouter();
  const decorators = [
    {
      // hp
      icon: <AiFillHeart className="text-red-500" />,
      bgColor: "bg-red-500",
    },
    {
      // attack
      icon: <RiSwordFill className="text-orange-500" />,
      bgColor: "bg-orange-500",
    },
    {
      // defense
      icon: <RiShieldFill className="text-slate-500" />,
      bgColor: "bg-slate-500",
    },
    {
      // special attack
      icon: <AiFillStar className="text-violet-500" />,
      bgColor: "bg-violet-500",
    },
    {
      // special defense
      icon: <RiShieldStarFill className="text-fuchsia-500" />,
      bgColor: "bg-fuchsia-500",
    },
    {
      // speed
      icon: <BiRun className="text-cyan-500" />,
      bgColor: "bg-cyan-500",
    },
  ];
  useEffect(() => {
    const setData = async () => {
      let res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${router.query.id}`
      );
      setPokemon(await res.json());
    };
    setData();
  });

  if (!pokemon) {
    return <div className="bg-slate-300">Cargando...</div>;
  }
  return (
    <Layout>
      <div className="bg-slate-100 h-[100vh] pt-12 flex justify-center items-center">
        <div className="grid grid-rows-3 grid-cols-2 gap-2 w-full h-full m-2">
          <div className="flex justify-center items-center">
            {pokemon.sprites.other.dream_world.front_default ? (
              <img
                className="h-full"
                src={pokemon.sprites.other.dream_world.front_default}
                alt={pokemon.name}
              />
            ) : (
              <img
                className="w-full"
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
              />
            )}
          </div>
          <div>
            <div className="flex flex-col gap-1">
              <div className="font-black text-center">
                {pokemon.name.toUpperCase().replace("-", " ")}
              </div>
              <div className="whitespace-nowrap flex gap-1">
                <AiOutlineDotChart className="text-lime-500" />
                {` ${pokemon.base_experience} xp.`}
              </div>
              <div className="flex gap-1">
                <AiOutlineColumnHeight className="text-orange-500" />
                {parseInt(pokemon.height) / 10} m.
              </div>
              <div className="flex gap-1">
                <GiWeight className="text-orange-900" />
                {parseInt(pokemon.weight) / 10} kg.
              </div>
            </div>
            <div>
              {pokemon.types.map((type)=>{
                return (
                  <div>
                    {type.type.name}
                  </div>
                )
              })}
            </div>
          </div>
          <div className="col-span-2 flex flex-col justify-between items-center gap-1">
            {pokemon.stats.map((stat, i) => {
              return (
                <div className="grid grid-cols-7 w-full text-sm ">
                  <div>{decorators[i].icon}</div>
                  <div className="w-full bg-white h-full col-span-6 overflow-hidden">
                    <div
                      className={`h-full ${decorators[i].bgColor} text-white pl-1`}
                      style={{ width: `${stat.base_stat / 2}%` }}
                    >
                      {stat.base_stat + "%"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div>cantidad de movimientos: {pokemon.forms.length}</div>
        </div>
      </div>
    </Layout>
  );
}
