import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState, useAppDispatch } from '../../redux/store'
import { getOrdersAsync } from '../../redux/orders/orederApis'
import OrdersViewItem from '../../components/tokenViews/OrdersViewItem'


const RecentOrders = () => {
  const allOrders = useSelector((state:RootState) => state.order.allOrders)
  const dispatch:AppDispatch = useAppDispatch()

  useEffect(() => {
    console.log("In useEffect")
    dispatch(getOrdersAsync())
  },[dispatch])

  return (
      <div className='w-full grid bg-slate-100 mt-36 border rounded-xl shadow-xl container mx-auto p-3'>
          <div className="grid grid-cols-4 w-full h-12">
              <div className="text-center font-semibold pt-2 text-xl">Name</div>
              <div className="text-center font-semibold pt-2 text-xl">Saled Counts</div>
              <div className="text-center font-semibold pt-2 text-xl">Price</div>
              <div className="text-center font-semibold pt-2 text-xl">Date</div>
              </div>
              {allOrders.length!==0 && allOrders.map((item, index) => (
                  <OrdersViewItem item={item} key={index} />
              ))}
        </div>
  )
}


export default RecentOrders;