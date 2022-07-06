import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShirt, faHatCowboy } from "@fortawesome/free-solid-svg-icons"
import { useSelector, useDispatch } from "react-redux"
import { fetchItems } from "../store/actions/ItemActions"
import { toRupiah } from "../store/actions/GeneralActions"

const Items = () => {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.items)

  useEffect(() => {
    dispatch(fetchItems())
  }, [])

  return (
    <div className="grid grid-cols-4 mt-2 w-[85vw] items-center overflow-auto h-[100%]">
      {items.map((item) => (
        <div
          key={item.name}
          className="flex flex-col bg-white text-zinc-600 h-[28vh] px-2 m-2 rounded-lg justify-center"
        >
          <h2 className="text-center font-semibold text-xl mb-1">{item.name}</h2>
          <div className="flex flex-col items-center mb-4">
            {item.type === "tops" && (
              <FontAwesomeIcon
                icon={faShirt}
                className="text-emerald-100 p-[4px] mr-2 w-6 h-6 rounded-lg bg-emerald-400"
              />
            )}
            {item.type === "hats" && (
              <FontAwesomeIcon
                icon={faHatCowboy}
                className="text-emerald-100 p-[4px] mr-2 w-6 h-6 rounded-lg bg-emerald-400"
              />
            )}
            {item.type === "shorts" && (
              <img
                src={require("../assets/shorts.png")}
                className="w-8 h-8 p-[6px] mr-2 rounded-lg bg-emerald-400"
                alt="logo"
              />
            )}
          </div>

          <h1 className="text-center">Prices</h1>
          <div className="flex justify-between w-3/4">
            <h1 className="mr-2">Regular</h1>
            <p>{toRupiah(item.prices[0].price)}</p>
          </div>
          {item.prices[1] && (
            <div className="flex">
              {item.prices[1].priceFor === "VIP" && (
                <div className="flex justify-between w-3/4">
                  <h1 className="mr-2">VIP</h1>
                  <p>{toRupiah(item.prices[1].price)}</p>
                </div>
              )}
              {item.prices[1].priceFor === "wholesale" && (
                <div className="flex justify-between w-3/4">
                  <h1 className="mr-2">wholesale</h1>
                  <p>{toRupiah(item.prices[1].price)}</p>
                </div>
              )}
            </div>
          )}
          {item.prices[2] && (
            <div className="flex">
              {item.prices[2].priceFor === "VIP" && (
                <div className="flex justify-between w-3/4">
                  <h1 className="mr-2">VIP</h1>
                  <p>{toRupiah(item.prices[2].price)}</p>
                </div>
              )}
              {item.prices[2].priceFor === "wholesale" && (
                <div className="flex justify-between w-3/4">
                  <h1 className="mr-2">wholesale</h1>
                  <p>{toRupiah(item.prices[2].price)}</p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Items
