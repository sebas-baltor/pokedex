import {BiSearchAlt,BiMenuAltRight} from "react-icons/bi"
import Link from "next/link";
import {motion} from "framer-motion";
import { useRef,useState } from "react";
const variants = {
  open : {opacity:1,x:0},
  closed: {opacity:0,x:"100%"}
}
export default function Layout({ children,home }) {
  const [isOpen,setIsOpen] = useState(false);
  return (
    <>
    <motion.nav
      animate = {isOpen?"open":"closed"}
      variants = {variants}
    >
      <Toggle onClick={()=>setIsOpen(isOpen=>!isOpen)}/>
      <Items/>
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
