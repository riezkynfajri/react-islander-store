import Swal from "sweetalert2"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { fetchItems } from "../store/actions/ItemActions"
import {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
} from "../store/actions/TransactionActions"
import { fetchBuyers } from "../store/actions/BuyerActions"
import { toRupiah } from "../store/actions/GeneralActions"

const Transactions = () => {
  const dispatch = useDispatch()
  const transactions = useSelector((state) => state.transactions)
  const items = useSelector((state) => state.items)
  const buyers = useSelector((state) => state.buyers)

  const [localTransactions, setLocalTransactions] = useState(null)
  const [input, setInput] = useState({
    item: "",
    qty: 0,
    buyer: "",
  })

  useEffect(() => {
    dispatch(fetchTransactions())
    dispatch(fetchItems())
    dispatch(fetchBuyers())
  }, [])

  useEffect(() => setLocalTransactions(transactions), [transactions])
  function inputChange(e) {
    const { value, name } = e.target
    setInput({
      ...input,
      [name]: value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (input.item === "" || input.qty === 0 || input.buyer === "") {
      Swal.fire({
        title: "Error",
        text: "Please fill in all fields",
        icon: "error",
      })
    } else {
      dispatch(addTransaction(input)).then(() => {
        const item = document.getElementsByName("item")
        const qty = document.getElementsByName("qty")
        const buyer = document.getElementsByName("buyer")
        input.id = localTransactions.length + 1
        item.value = ""
        qty.value = ""
        buyer.value = ""
        Swal.fire({
          title: "Success",
          text: `${input.item} has been added`,
          icon: "success",
        })
        setLocalTransactions([...localTransactions, input])
        setInput({ item: "", qty: 0, buyer: "" })
      })
    }
  }

  function remove(id) {
    dispatch(deleteTransaction(id)).then(() => {
      const newTransactions = localTransactions.filter((transaction) => {
        return transaction.id !== id
      })
      Swal.fire({
        title: "Success",
        text: `item has been deleted`,
        icon: "success",
      })
      setLocalTransactions(newTransactions)
    })
  }

  function generateRevenue(name, buyer, quantity) {
    const item = items.find((item) => item.name === name)
    const targetBuyer = buyers.find((target) => target.name === buyer)
    let itemPrice
    if (targetBuyer) {
      if (targetBuyer.type === "regular") {
        itemPrice = item.prices[0].price
      } else if (targetBuyer.type === "VIP") {
        item.prices.length === 2 && item.prices[1].priceFor === "VIP"
          ? (itemPrice = item.prices[1].price)
          : (itemPrice = item.prices[0].price)
      } else if (targetBuyer.type === "wholesale") {
        if (item.prices.length === 2 && item.prices[1].priceFor === "wholesale") {
          itemPrice = item.prices[1].price
        } else if (item.prices.length === 3 && item.prices[2].priceFor === "wholesale") {
          itemPrice = item.prices[2].price
        } else {
          itemPrice = item.prices[0].price
        }
      }
    }
    return toRupiah(itemPrice * quantity)
  }

  return (
    <div className="flex flex-col w-[85vw]">
      <form
        onSubmit={handleSubmit}
        className="text-zinc-600 flex align-middle bg-white w-auto h-16 items-center space-x-4"
      >
        <span className="w-36 text-center">Add Transaction</span>
        <select
          name="item"
          value={input.item}
          onChange={inputChange}
          className="outline-none text-zinc-600 text-center"
        >
          <option value={""} disabled>
            Select Item
          </option>
          {items.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Item Quantity"
          name="qty"
          onChange={inputChange}
          className="outline-none border-b-2 text-center border-white focus:border-sky-400 duration-500 "
        />
        <select
          name="buyer"
          value={input.buyer}
          onChange={inputChange}
          className="outline-none text-zinc-600 text-center"
        >
          <option value={""} disabled>
            Select Buyer
          </option>
          {buyers.map((buyer) => (
            <option key={buyer.id} value={buyer.name}>
              {buyer.name}
            </option>
          ))}
        </select>
        <input
          value="submit"
          type={"submit"}
          className="bg-indigo-600 py-1 px-4 rounded-lg text-white cursor-pointer"
        />
      </form>
      <table className="mt-4 mx-[2.5vw] w-[80vw] table-fixed justify-center bg-transparent shadow-lg">
        <thead className="bg-white">
          <tr>
            <th className="py-4 text-xs text-zinc-700 rounded-tl-xl">Item</th>
            <th className="py-4 text-xs text-zinc-700">Quantity</th>
            <th className="py-4 text-xs text-zinc-700">Buyer</th>
            <th className="py-4 text-xs text-zinc-700">Revenue</th>
            <th className="py-4 text-xs text-zinc-700 rounded-tr-xl">Action</th>
          </tr>
        </thead>
        <tbody className="text-center text-white">
          {localTransactions &&
            localTransactions.map((transaction) => (
              <tr key={transaction.id} className="h-12">
                <td>{transaction.item}</td>
                <td>{transaction.qty}</td>
                <td>{transaction.buyer}</td>
                <td>{generateRevenue(transaction.item, transaction.buyer, transaction.qty)}</td>
                <td>
                  <button onClick={() => remove(transaction.id)}>
                    <FontAwesomeIcon
                      className="text-white py-[6px] px-2 bg-rose-500 rounded hover:scale-[1.2] hover:text-rose-500 hover:bg-white duration-500"
                      icon={faTrash}
                    />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Transactions
