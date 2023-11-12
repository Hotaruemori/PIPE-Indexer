import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState, useAppDispatch } from '../../redux/store'
import { getOrdersAsync } from '../../redux/orders/orederApis'
import OrdersViewItem from '../../components/tokenViews/OrdersViewItem'


const RecentOrders = () => {
  const allOrders = useSelector((state:RootState) => state.order.allOrders)
  const dispatch:AppDispatch = useAppDispatch()
  const [curIndex, setCurIndex ] = useState(1)
  const pageshow:number = 10
  
  useEffect(() => {
    console.log("In useEffect")
    dispatch(getOrdersAsync())
  },[dispatch])

  const handlePreviousClick = () =>
  {
      if(curIndex > 1)
          setCurIndex(curIndex-1)
  }

  const handleNextClick = () =>
  {

      if(curIndex < (allOrders.length / pageshow))
          setCurIndex(curIndex+1)

  }

  return (
    <div className="dark:bg-slate-700 pt-1 pb-6">
      <div className='w-full grid bg-slate-100 dark:bg-slate-800 mt-36 rounded-xl shadow-xl container mx-auto px-20 py-4'>
          <div className="grid grid-cols-4 w-full h-12">
              <div className="text-center font-semibold pt-4 text-xl dark:text-gray-300">Name</div>
              <div className="text-center font-semibold pt-4 text-xl dark:text-gray-300">Saled Counts</div>
              <div className="text-center font-semibold pt-4 text-xl dark:text-gray-300">Price</div>
              <div className="text-center font-semibold pt-4 text-xl dark:text-gray-300">Date</div>
              </div>
              {allOrders.length!==0 && allOrders.map((item, index) => {
                if((index >= (curIndex-1)* pageshow ) && (index < curIndex*pageshow))
                    return (<OrdersViewItem item={item} key={index} />)
              })}
              <div className="grid grid-cols-5 w-full h-12 mt-5 pr-5">
                  <div className="col-end-6 col-span-1 text-right">
                        <span className="mr-3 text-lg dark:text-gray-300">Page {curIndex} of {Math.round(allOrders.length / pageshow)}</span>
                        <button onClick={e => handlePreviousClick()} className="w-12 h-12 mr-2 text-blue-900 dark:text-white font-semibold text-xl rounded-lg shadow-sm shadow-blue-400 bg-white dark:bg-blue-950">{"<"}</button>
                        <button onClick={e=> handleNextClick()} className="w-12 h-12 mr-2 bg-white dark:bg-blue-950 text-blue-900 dark:text-white font-semibold text-xl rounded-lg shadow-sm shadow-blue-400">{">"}</button>
                  </div>
              </div>
        </div>
        </div>
  )
}


export default RecentOrders;