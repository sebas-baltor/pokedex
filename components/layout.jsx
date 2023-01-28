import { BiSearchAlt, BiMenuAltRight } from "react-icons/bi";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import Router from "next/router";
const variantsToggle = {
  open: { rotate:0 },
  closed: {rotate:10 },
};
const variantsNav = {
  opend: { opacity: 1, y:0 },
  closed: { opacity: 0, y:"-100%" },
};

export default function Layout({ children, home }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const handlerSubmit = (e) => {
    e.preventDefault();
    Router.push(`/pokemon/${search}`);
  }
  return (
    <>
      <motion.nav
        className="w-full fixed z-30 top-0 left-0 flex justify-between items-center p-2"
        animate={isOpen ? "open" : "closed"}
      >
        <motion.div className="font-bold">Pokedex</motion.div>
        <motion.form className="flex relative justify-center items-center rounded-full bg-white w-1/2 overflow-hidden px-2" on onSubmit={handlerSubmit}>
          <motion.input
            type="text"
            placeholder="buscar por nombre o id"
            className="bg-inherit pl-1 pr-4 runded outline-none w-full"
            onChange={(e)=>setSearch(e.target.value)}
            value={search}
          ></motion.input>
          <motion.button
            type="submit"
            className="w-7 h-7 rounded-full flex justify-center items-center absolute top-0 right-0"
          >
            <BiSearchAlt className="group-focus:decoration-cyan-100"/>
          </motion.button>
        </motion.form>
        <motion.button 
        onClick={() => setIsOpen((isOpen) => !isOpen)}
        variants={variantsToggle}
        animate={isOpen?"opend":"closed"}
        >
          <BiMenuAltRight />
        </motion.button>
        <motion.ul
          className="absolute z-[-15] top-0 left-0 w-full h-[100vh] flex flex-col justify-center items-center bg-sky-100 gap-2"
          variants={variantsNav}
          animate={isOpen ? "opend" : "closed"}
        >
          <motion.li>
            <Link href={"pokemon/byPage"}>Pokemon</Link>
          </motion.li>
          <motion.li>
            <Link href={"pokemon/1"}>Pokemon 1</Link>
          </motion.li>
        </motion.ul>
      </motion.nav>
      <main className="w-full">
        {children}
      </main>
    </>
  );
}
