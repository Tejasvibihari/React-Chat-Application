
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./Pages/Home"
import Signup from "./Pages/Signup"


export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
