import React from "react"
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import Header from "./components/Header"
import Home from "./pages/clientPages/Home"
import RecentOrders from "./pages/clientPages/RecentOrders"
import AdminTokens from './pages/adminPages/adminTokens'
import AdminSales from './pages/adminPages/adminSales'
import { store } from './redux/store'

const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recentOrders" element={<RecentOrders />} />
          
          <Route path="/admin/tokens" element={<AdminTokens />} />
          <Route path="/admin/sales" element={<AdminSales />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
