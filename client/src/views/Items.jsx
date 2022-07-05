import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShirt, faHatCowboy } from "@fortawesome/free-solid-svg-icons"
import { useSelector, useDispatch } from "react-redux"
import { fetchItems } from "../store/actions/ItemActions"

const Items = () => {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.items)

  useEffect(() => {
    dispatch(fetchItems())
  }, [])

  return (
    <div className="grid grid-cols-4 mt-2 w-full items-center mx-4 overflow-auto h-[100%]">
      {items.map((item) => (
        <div
          key={item.name}
          className="flex flex-col bg-white text-zinc-600 h-20 px-2 m-2 rounded-lg justify-center"
        >
          <h2 className="text-center">{item.name}</h2>
          <div className="flex ml-2">
            <h2 className="text-center mr-2">type:</h2>
            <h2 className="">{item.type}</h2>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Items
