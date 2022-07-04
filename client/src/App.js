import "./App.css"
import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router-dom"
import Buyers from "./views/Buyers"
import Items from "./views/Items"
import Transactions from "./views/Transactions"
function App() {
  return (
    <div className="flex bg-gradient-to-tl from-pink-600 to-sky-500 bg-repeat min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/buyers" element={<Buyers />} />
        <Route path="/items" element={<Items />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </div>
  )
}

export default App
