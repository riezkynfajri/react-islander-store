import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTrophy,
  faDumpster,
  faChartLine,
  faShirt,
  faHatWizard,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons"
import { fetchBuyers } from "../store/actions/BuyerActions"
import { fetchItems } from "../store/actions/ItemActions"
import { fetchTransactions } from "../store/actions/TransactionActions"
import { toRupiah } from "../store/actions/GeneralActions"

export default function Summary() {
  const dispatch = useDispatch()
  const transactions = useSelector((state) => state.transactions)
  const items = useSelector((state) => state.items)
  const buyers = useSelector((state) => state.buyers)
  const [bestSelling, setBestSelling] = useState(null)
  const [leastSelling, setLeastSelling] = useState(null)
  const [bestSellingCat, setBestSellingCat] = useState(null)
  const [clicked, setClicked] = useState(false)
  const [hatRevenue, setHatRevenue] = useState(0)
  const [shirtRevenue, setShirtRevenue] = useState(0)
  const [shortRevenue, setShortRevenue] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)

  useEffect(() => {
    dispatch(fetchTransactions())
    dispatch(fetchItems())
    dispatch(fetchBuyers())
  }, [])

  function generateSum() {
    const squareHat = transactions
      .filter((transaction) => transaction.item === "square hat")
      .map((el) => {
        return el.qty
      })
      .reduce((partialSum, a) => partialSum + a, 0)
    const ovalHat = transactions
      .filter((transaction) => transaction.item === "oval hat")
      .map((el) => {
        return el.qty
      })
      .reduce((partialSum, a) => partialSum + a, 0)
    const magicShirt = transactions
      .filter((transaction) => transaction.item === "magic shirt")
      .map((el) => {
        return el.qty
      })
      .reduce((partialSum, a) => partialSum + a, 0)

    const itemsArr = [squareHat, ovalHat, magicShirt]

    const max = Math.max(...itemsArr)
    if (max === squareHat) setBestSelling("square hat")
    else if (max === ovalHat) setBestSelling("oval hat")
    else if (max === magicShirt) setBestSelling("magic shirt")

    const min = Math.min(...itemsArr)
    if (min === squareHat) setLeastSelling("square hat")
    else if (min === ovalHat) setLeastSelling("oval hat")
    else if (min === magicShirt) setLeastSelling("magic shirt")

    const totalHats = squareHat + ovalHat
    const totalShirts = magicShirt
    totalHats > totalShirts ? setBestSellingCat("hats") : setBestSellingCat("shirts")

    const squareHatRevenue =
      squareHat * items.find((item) => item.name === "square hat").prices[0].price
    const ovalHatRevenue = ovalHat * items.find((item) => item.name === "oval hat").prices[0].price
    const magicShirtRevenue =
      magicShirt * items.find((item) => item.name === "magic shirt").prices[0].price
    setHatRevenue(squareHatRevenue + ovalHatRevenue)
    setShirtRevenue(magicShirtRevenue)
    setTotalRevenue(squareHatRevenue + ovalHatRevenue + magicShirtRevenue)

    setClicked(true)
  }

  return (
    <div className="flex flex-col items-center align-middle justify-center w-[85vw]">
      {!clicked && (
        <button
          className="p-2 bg-indigo-600 text-white rounded-lg hover:text-indigo-500 hover:bg-white hover:scale-125 duration-500"
          onClick={() => generateSum()}
        >
          Generate Summary
        </button>
      )}
      {clicked && (
        <div className="flex flex-col w-[80vw] mx-[2.5vw] bg-none h-[90vh]">
          <h1 className="font-semibold text-2xl text-center mb-4 text-white">Sales Summary</h1>
          <div className="flex flex-wrap space-x-4 justify-center text-zinc-600 ">
            <div className="flex flex-col text-center justify-center bg-white h-16 w-36 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">{transactions.length}</h3>
              <h3 className="text-sm">Total Transactions</h3>
            </div>
            <div className="flex items-center h-16 bg-white rounded-lg shadow-lg">
              <FontAwesomeIcon icon={faTrophy} className="text-yellow-400 text-3xl mx-4" />
              <div className="flex flex-col text-center mr-4">
                <h3>Best Selling Item </h3>
                <h3 className="font-semibold text-lg">{bestSelling}</h3>
              </div>
            </div>
            <div className="flex items-center h-16 bg-white rounded-lg shadow-lg">
              <FontAwesomeIcon icon={faDumpster} className="text-red-400 text-3xl mx-4" />
              <div className="flex flex-col text-center mr-4">
                <h3>Least Selling Item </h3>
                <h3 className="font-semibold text-lg">{leastSelling}</h3>
              </div>
            </div>

            <div className="flex items-center h-16 bg-white rounded-lg shadow-lg">
              <FontAwesomeIcon icon={faChartLine} className="text-green-400 text-3xl mx-4" />
              <div className="flex flex-col text-center mr-4">
                <h3>Best Selling Category</h3>
                <h3 className="font-semibold text-lg">{bestSellingCat}</h3>
              </div>
            </div>
          </div>
          <h2 className="text-center text-xl text-white my-8 font-semibold">
            Revenue Per Category
          </h2>
          <div className="mx-4 flex space-x-4 flex-wrap text-center justify-center">
            <div className="flex items-center h-16 bg-white rounded-lg shadow-lg">
              <FontAwesomeIcon icon={faHatWizard} className="text-indigo-400 text-3xl mx-4" />
              <div className="flex flex-col text-center mr-4">
                <h3>Hats</h3>
                <p>{toRupiah(hatRevenue)}</p>
              </div>
            </div>
            <div className="flex items-center h-16 bg-white rounded-lg shadow-lg">
              <FontAwesomeIcon icon={faShirt} className="text-sky-400 text-3xl mx-4" />
              <div className="flex flex-col text-center mr-4">
                <h3>Shirts</h3>
                <p>{toRupiah(shirtRevenue)}</p>
              </div>
            </div>
            <div className="flex items-center h-16 bg-white rounded-lg shadow-lg">
              <img
                src={require("../assets/shorts.png")}
                className="w-10 h-10 mx-4 rounded-full bg-emerald-400"
                alt="logo"
              />
              <div className="flex flex-col text-center mr-4">
                <h3>Shorts</h3>
                <p>{toRupiah(shortRevenue)}</p>
              </div>
            </div>
            <div className="flex items-center h-16 bg-white rounded-lg shadow-lg">
              <FontAwesomeIcon
                icon={faDollarSign}
                className="text-amber-400 bg-yellow-200 w-12 h-12 rounded-full mx-4"
              />
              <div className="flex flex-col text-center mr-4">
                <h3>Total</h3>
                <p>{toRupiah(totalRevenue)}</p>
              </div>
            </div>
          </div>
          <p className="text-center mt-4 text-sm text-zinc-300">
            *Assuming all transactions are with regular customers
          </p>
        </div>
      )}
    </div>
  )
}
