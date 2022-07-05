export function fetchItems() {
  return (dispatch) => {
    fetch("http://localhost:3000/Items")
      .then((res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((data) => {
        dispatch({
          type: "getItems",
          payload: data,
        })
      })
      .catch((err) => console.log(err))
  }
}
