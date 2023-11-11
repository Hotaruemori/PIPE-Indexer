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
    <div className="grid grid-cols-5 mt-2 bg-orange-200 w-full h-12 shadow-md shadow-orange-400">
      <div className="text-center font-semibold pt-2 text-2xl">{item.name}</div>
      <div className="text-center font-semibold pt-2 text-2xl">${Math.round(item.price).toFixed(3)}</div>
      <div className="text-center font-semibold pt-2 text-2xl">{Math.round(volInfo.volPercent).toFixed(2)}%</div>
      <div className="text-center font-semibold pt-2 text-2xl">${getMarketCap(item.maxval, item.price, 1000).toLocaleString("en-US")}</div>
      <div className="text-center font-semibold pt-2 text-2xl">${volInfo.volPrice.toLocaleString("en-US")}</div>
    </div>
  )
}

export default MapViewItem
