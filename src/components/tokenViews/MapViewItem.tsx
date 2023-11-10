import React, { useState,useEffect } from 'react'

import { getMarketCap } from '../../utils/getMarketCap'
import { tokenState, tokenType } from '../../redux/token/tokenSlice'

interface MapViewItemProps{
    item: tokenType
}

const MapViewItem: React.FC<MapViewItemProps> = ({item}) => {

  return (
    <div className="grid grid-cols-3 mt-2 bg-orange-200 w-full h-12 shadow-md shadow-orange-400">
      <div className="text-center font-semibold pt-2 text-2xl">{item.name}</div>
      <div className="text-center font-semibold pt-2 text-2xl">${Math.round(item.price).toFixed(3)}</div>
      <div className="text-center font-semibold pt-2 text-2xl">${getMarketCap(item.maxval, item.price, 1000).toLocaleString("en-US")}</div>
    </div>
  )
}

export default MapViewItem
