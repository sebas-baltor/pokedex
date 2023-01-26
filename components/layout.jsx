import { BiSearchAlt, BiMenuAltRight } from "react-icons/bi";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
const variantsToggle = {
  open: { opacity: 1, rotate:0 },
  closed: { opacity: 0, rotate:10 },
};
const variantsNav = {
  opend: { opacity: 1, y:100 },
  closed: { opacity: 0, y:0 },
};
const variantsSearch = {
  open: {},
};

export default function Layout({ children, home }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  return (
    <>
      <motion.nav
        className="w-full fixed z-30 top-0 left-0 flex justify-between items-center px-2"
        animate={isOpen ? "open" : "closed"}
      >
        <motion.div className="font-bold">Pokedex</motion.div>
        <motion.form className="flex justify-center items-center">
          <motion.input
            type="search"
            className="bg-inherit p-1 runded focus:bg-sky-100"
          ></motion.input>
          <motion.button
            type="submit"
            className="w-7 h-7 rounded-full bg-sky-100 flex justify-center items-center"
            variants={variantsToggle}
            animate={isOpen?"opend":"closed"}
          >
            <BiSearchAlt />
          </motion.button>
        </motion.form>
        <motion.button onClick={() => setIsOpen((isOpen) => !isOpen)}>
          <BiMenuAltRight />
        </motion.button>
        <motion.ul
          className="absolute z-20 top-14 left-0 w-full flex flex-col justify-center items-center bg-sky-100"
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
      {/* <nav className="fixed z-20 top-0 left-0 w-full p-3 flex justify-between items-center">
        <span className="font-bold">Pokedex</span>
        <form action="#" className="flex items-center group bg-slate-100">
          <input type="search" placeholder="Search" className="max-w-0 group-hover:max-w-xs group-focus:max-w-xs outline-none bg-inherit p-1"/>
          <button type="submit" className="bg-sky-100 rounded-full w-7 h-7 flex justify-center items-center">
            <BiSearchAlt/>
          </button>
        </form>
        <ul className="flex flex-col items-center justify-between md:hidden absolute top-14 right-0 w-full">
            {home ? <li></li>:<li><a href="/home">Home</a></li>}
            <li><Link href="./pokemon/byPage">Pokemones</Link></li>
            <li><Link href="#">Places</Link></li>
        </ul>
        <div className="md:hidden focus:bg-sky-100"><BiMenuAltRight/></div>
      </nav> */}
      <main className="w-full flex flex-col justify-center items-center">
        {children}
      </main>
    </>
  );
}
