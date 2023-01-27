import Image from "next/image";
import Layout from "../components/Layout";
import PokeCard from "../components/pokeCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
export default function Index({ pokemones }) {
  const responsive = {
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      partialVisiblilityGutter: 40,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisiblilityGutter: 20,
    },
  };
  return (
    <Layout home>
      <div className="max-w-screen-lg  w-full h-[100vh] bg-slate-100 overflow-hidden">
        <div className="relative w-full h-2/5 mt-12 flex justify-center">
          <h1 className="absolute z-10 whitespace-nowrap text-7xl font-black top-1/4">
            PIKACHU
          </h1>
          <Image
            className="absolute z-10"
            src="/assets/pikachu.png"
            height={300}
            width={300}
            alt="pikachu"
          />
        </div>
        <div className="flex justify-end items-center h-1/4">
          <div className="w-full h-full">
            {/* <Carousel
              responsive={responsive}
              showDots={false}
              draggable={true}
              swipeable={true}
              infinite={true}
              removeArrowOnDeviceType={["tablet", "mobile"]}
              centerMode={true}
              autoPlaySpeed={3000}
              autoPlay={true}
            >
              {pokemones.map((pokemon) => {
                return <PokeCard pokemon={pokemon} key={pokemon.id} />;
              })}
            </Carousel> */}
          </div>
        </div>
      </div>
    </Layout>
  );
}
export async function getStaticProps() {
  let offset = Math.floor((Math.random() * 1008) % 6);
  // const res = await fetch(
  //   `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=6`
  // );
  // const json = await res.json();
  const pokemones = [];
  // for (let item of json.results) {
  //   const res = await fetch(item.url);
  //   const json = await res.json();
  //   pokemones.push(json);
  // }
  return {
    props: {
      pokemones,
    },
  };
}
