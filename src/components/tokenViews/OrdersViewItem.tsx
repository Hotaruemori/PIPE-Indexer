import React, { useState,useEffect } from 'react'

import { orderType } from '../../redux/orders/orderSlice'

interface OrdersViewItemProps{
    item: orderType
}

const OrdersViewItem: React.FC<OrdersViewItemProps> = ({item}) => {
  const ordertime = new Date(item.orderstime)
  return (
    <div className="grid grid-cols-4 mt-2 bg-green-200 w-full h-12 shadow-md shadow-green-400">
      <div className="text-center font-semibold pt-2 text-2xl">{item.name}</div>
      <div className="text-center font-semibold pt-2 text-2xl">{item.volume}</div>
      <div className="text-center font-semibold pt-2 text-2xl">${item.price.toLocaleString("en-US")}</div>
      <div className="text-center font-semibold pt-2 text-2xl">{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(ordertime)}</div>
    </div>
  )
}

export default OrdersViewItem
