import "./App.css"
import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router-dom"
import Home from "./views/Home"
import Buyers from "./views/Buyers"
import Items from "./views/Items"
import Transactions from "./views/Transactions"
import Summary from "./views/Summary"
function App() {
  return (
    <div className="flex bg-gradient-to-tl from-pink-600 to-sky-500 bg-repeat min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buyers" element={<Buyers />} />
        <Route path="/items" element={<Items />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </div>
  )
}

export default App
