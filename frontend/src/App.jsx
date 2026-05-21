import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
      </Routes> 

    </BrowserRouter>
  )
}

export default App;