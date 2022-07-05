export function fetchBuyers() {
  return (dispatch) => {
    fetch("http://localhost:3000/Buyers")
      .then((res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((data) => {
        dispatch({
          type: "getBuyers",
          payload: data,
        })
      })
      .catch((err) => console.log(err))
  }
}

export function addBuyer(input) {
  return (dispatch) => {
    console.log(input)
    return fetch("http://localhost:3000/Buyers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
  }
}
