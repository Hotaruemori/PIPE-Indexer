import React, { useState,useEffect } from 'react'

import { getMarketCap } from '../../utils/getMarketCap'
import { tokenType } from '../../redux/token/tokenSlice'
import { volInfoType } from '../../redux/orders/orderSlice'

interface MapViewItemProps{
    item: tokenType,
    volInfo: volInfoType
}

const MapViewItem: React.FC<MapViewItemProps> = ({item, volInfo}) => {
  return (
    <div className="grid grid-cols-5 mt-2 bg-orange-300 dark:bg-blue-950 w-full h-10 shadow-sm rounded-md shadow-cyan-400 dark:shadow-blue-700 cursor-pointer text-slate-900 dark:text-purple-200">
      <div className="text-center font-semibold pt-2 text-sm">{item.name}</div>
      <div className="text-center font-semibold pt-2 text-sm">${(volInfo.recentPrice).toFixed(10)}</div>
      <div className="text-center font-semibold pt-2 text-sm">{(volInfo.volPercent).toFixed(2)}%</div>
      <div className="text-center font-semibold pt-2 text-sm">${getMarketCap(item.maxval, volInfo.recentPrice, volInfo.recentSaleCount).toLocaleString("en-US")}</div>
      <div className="text-center font-semibold pt-2 text-sm">${(volInfo.volPrice * volInfo.recentPrice).toFixed(10)}</div>
    </div>
  )
}

export default MapViewItem
