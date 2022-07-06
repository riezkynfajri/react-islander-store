import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchBuyers, addBuyer } from "../store/actions/BuyerActions"
import Swal from "sweetalert2"

const Buyers = () => {
  const dispatch = useDispatch()
  const buyers = useSelector((state) => state.buyers)

  const [input, setInput] = useState({
    name: "",
    type: "",
  })
  const [localBuyers, setLocalBuyers] = useState(null)

  useEffect(() => {
    dispatch(fetchBuyers())
  }, [])

  useEffect(() => {
    setLocalBuyers(buyers)
  }, [buyers])

  function inputChange(e) {
    const { value, name } = e.target
    setInput({
      ...input,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nameCheck = localBuyers.find((buyer) => buyer.name === input.name)
    if (input.name === "" || input.type === "") {
      Swal.fire({
        title: "Error",
        text: "Please fill in all fields",
        icon: "error",
      })
    } else if (nameCheck) {
      Swal.fire({
        title: "Error",
        text: "Buyer already exists",
        icon: "error",
      })
    } else {
      dispatch(addBuyer(input)).then(() => {
        const name = document.getElementsByName("name")
        const type = document.getElementsByName("type")
        input.id = localBuyers.length + 1
        name.value = ""
        type.value = ""
        Swal.fire({
          title: "Success",
          text: `${input.name} has been added`,
          icon: "success",
        })
        setLocalBuyers([...localBuyers, input])
        setInput({ name: "", type: "" })
      })
    }
  }
  return (
    <div className="flex flex-col w-[85vw]">
      <form
        onSubmit={handleSubmit}
        className="text-zinc-600 flex align-middle bg-white w-auto h-16 items-center space-x-4"
      >
        <span className="w-24 text-center">Add Buyer</span>
        <input
          name="name"
          value={input.name}
          placeholder="Buyer Name"
          type={"text"}
          onChange={inputChange}
          className="text-center w-1/2 outline-none border-b-2 border-white focus:border-sky-300 duration-500"
        />
        <select
          name="type"
          value={input.type}
          onChange={inputChange}
          className="outline-none text-zinc-600 text-center"
        >
          <option value="">Buyer Type</option>
          <option value="regular">regular</option>
          <option value="VIP">VIP</option>
          <option value="wholesale">wholesale</option>
        </select>
        <input
          value="submit"
          type={"submit"}
          className="bg-indigo-600 py-1 px-4 rounded-lg text-white cursor-pointer"
        />
      </form>
      <div className="scrollbar-thin scrollbar-thumb-rose-400 scrollbar-track-transparent overflow-y-scroll scrollbar-thumb-rounded-xl h-[90vh]">
        <div className="grid grid-cols-6 mt-2 w-auto items-start mx-4">
          {localBuyers &&
            localBuyers.map((buyer) => (
              <div
                key={buyer.id}
                className="flex flex-col bg-white h-20 px-2 m-2 rounded-lg items-center justify-center"
              >
                <h2>{buyer.name}</h2>
                {buyer.type === "regular" && (
                  <h2 className="pt-[0.5px] pb-1 px-2 bg-zinc-400 rounded-lg text-zinc-100 bg-opacity-70 shadow-lg ">
                    {buyer.type}
                  </h2>
                )}
                {buyer.type === "VIP" && (
                  <h2 className="pt-[0.5px] pb-1 px-2 bg-yellow-400 rounded-lg text-yellow-100 bg-opacity-90 shadow-lg">
                    {buyer.type}
                  </h2>
                )}
                {buyer.type === "wholesale" && (
                  <h2 className="pt-[0.5px] pb-1 px-2 bg-emerald-400 rounded-lg text-emerald-100 bg-opacity-90 shadow-lg">
                    {buyer.type}
                  </h2>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Buyers
