import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Deposit from './pages/Deposit'
import Withdraw from './pages/Withdraw'
import Profile from './pages/Profile'
import Forgot from './pages/Forgot'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <Router>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/createaccount' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/deposit' element={<Deposit />} />
          <Route path='/withdraw' element={<Withdraw />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/forgot/password' element={<Forgot />} />
        </Routes>
        <Footer />
    </Router>
  )
}

export default App