export function fetchTransactions() {
  return (dispatch) => {
    fetch("http://localhost:3000/Transaction")
      .then((res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((data) => {
        dispatch({ type: "getTransactions", payload: data })
      })
      .catch((err) => console.log(err))
  }
}

export function addTransaction(input) {
  return (dispatch) => {
    return fetch("http://localhost:3000/Transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
  }
}

export function deleteTransaction(id) {
  return (dispatch) => {
    return fetch(`http://localhost:3000/Transaction/${id}`, { method: "delete" })
  }
}
