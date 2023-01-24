import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Layout({ children,home }) {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full p-3">
        <span className="font-bold">Pokedex</span>
        <form action="#">
          <input type="search" placeholder="Search" />
          <button type="submit">
            <FontAwesomeIcon icon="fa-solid fa-sliders-simple" />
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
          </button>
        </form>
        <ul>
            {home ? <li><a href="/home">Home</a></li>:<li></li>}
            <li><a href="#">pokemones</a></li>
        </ul>
      </nav>
      <main className="w-full flex flex-col justify-center items-center">
        {children}
      </main>
    </>
  );
}
