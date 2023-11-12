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

window.document.body.className = "dark:bg-slate-700"

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        { path!=="/admin" && path!=="/register" ? <Header /> : <></>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recentOrders" element={<RecentOrders />} />
          
          <Route path="/admin/tokens" element={<AdminTokens />} />
          <Route path="/admin/sales" element={<AdminSales />} />
          <Route path="/admin" element={<LoginPage/> } />
          <Route path="/register" element={<RegisterPage/> } />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
