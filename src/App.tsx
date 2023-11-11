import React from "react"
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import Header from "./components/common/Header"
import Home from "./pages/clientPages/Home"
import RecentOrders from "./pages/clientPages/RecentOrders"
import AdminTokens from './pages/adminPages/adminTokens'
import AdminSales from './pages/adminPages/adminSales'
import LoginPage from "./pages/auth/login"
import RegisterPage from "./pages/auth/register"
import { store } from './redux/store'

const path = window.location.pathname

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        { path!=="/" && path!=="/register" ? <Header /> : <></>}
        <Routes>
          <Route path="/homePage" element={<Home />} />
          <Route path="/recentOrders" element={<RecentOrders />} />
          
          <Route path="/admin/tokens" element={<AdminTokens />} />
          <Route path="/admin/sales" element={<AdminSales />} />
          <Route path="/" element={<LoginPage/> } />
          <Route path="/register" element={<RegisterPage/> } />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
