import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsersLine, faBoxOpen, faCashRegister } from "@fortawesome/free-solid-svg-icons"

export default function Navbar() {
  return (
    <nav className="flex flex-col items-center py-4 bg-white w-[15vw]">
      <Link
        to={"/transactions"}
        className="flex items-center p-2 w-[96%] rounded-lg text-slate-600 font-medium text-base hover:text-white hover:bg-sky-300 hover:text-lg duration-300"
      >
        <FontAwesomeIcon icon={faCashRegister} className="mr-2" />
        Transactions
      </Link>
      <Link
        to={"/items"}
        className="flex items-center p-2 w-[96%] rounded-lg text-slate-600 font-medium text-base hover:text-white hover:bg-sky-300 hover:text-lg duration-300"
      >
        <FontAwesomeIcon icon={faBoxOpen} className="mr-2" />
        Items
      </Link>
      <Link
        to={"/buyers"}
        className="flex items-center p-2 w-[96%] rounded-lg text-slate-600 font-medium text-base hover:text-white hover:bg-sky-300 hover:text-lg duration-300"
      >
        <FontAwesomeIcon icon={faUsersLine} className="mr-2" />
        Buyers
      </Link>
    </nav>
  )
}
