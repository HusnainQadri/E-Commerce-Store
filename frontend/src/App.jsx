import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import React from 'react'
import Home from './pages/Home/Home'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Cart from './pages/Cart/Cart'	
import Signin from "./components/Signin/Signin"
import Signup from "./components/Signup/Signup"

function App() {
  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/details/:id" element={<ProductDetail/>} />
          <Route path="/" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>} />
          <Route path="*" element={<h1 style={{
            textAlign: 'center',
            marginTop: '100px'
          }}>404 Not Found</h1>} />
        </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App
