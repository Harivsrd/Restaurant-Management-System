import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {

  const [cartItems, setCartItems] = useState([]);

  return (
    <BrowserRouter>
      <Navbar cartItems={cartItems} />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={
          <Menu cartItems={cartItems} setCartItems={setCartItems} />
          } 
        />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} /> } />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />} />
      </Routes> 

    </BrowserRouter>
  )
}

export default App;