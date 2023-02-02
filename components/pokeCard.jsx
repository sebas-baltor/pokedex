import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const variantCard = {
  leave: { scale: 0.8 },
  hover: { scale: 1},
};
const variantImg = {
  leave: { scale: 1, rotate: 0 },
  hover: { scale: 1.2, rotate: [0, 10, 0, 10, 0] },
};
export default function PokeCard({ pokemon }) {
  // when the mouse enter into container (hover)
  const [isHover, setIsHover] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setIsHover((isHover) => !isHover)}
      onMouseLeave={() => setIsHover((isHover) => !isHover)}
      variants={variantCard}
      animate={isHover ? "hover" : "leave"}
    >
      <Link
        href={`pokemon/${pokemon.id}`}
        className="bg-sky-100 hover:bg-cyan-100 rounded-md p-1 m-1 flex flex-col justify-between items-center p-3"
      >
        <motion.img
          animate={isHover ? "hover" : "leave"}
          variants={variantImg}
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <div className="font-bold">{pokemon.name.toUpperCase()}</div>
      </Link>
    </motion.div>
  );
}
