import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import { getTokensAsync } from '../../redux/token/tokenApis'

import TotalCapView from '../../components/tokenViews/TotalCapView';
import MapViewItem from '../../components/tokenViews/MapViewItem';
import { getMarketCap } from '../../utils/getMarketCap';
import { getOrdersAsync } from '../../redux/orders/orederApis';


const Home = () => {
    const alltokens = useSelector((state:RootState) => state.token.alltokens)
    const allOrders = useSelector((state:RootState) => state.order.allOrders)
    const dispatch:AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(getTokensAsync())
        dispatch(getOrdersAsync())
    }, [dispatch])
    
    const getVolInfo = (name:string) => {
        let maxVol:number = 0
        let preMax:number = 0
        let volPrice:number = 0
        let curDate:Date = new Date(Date.now())
        let curDateInt:Date = new Date(curDate.getFullYear(),curDate.getMonth(),curDate.getDate())
        
        allOrders.map((item, index) => {
            if(item.name === name)
            {
                if(maxVol < item.price)
                {
                    preMax = maxVol
                    maxVol = item.price
                }
                if(item.orderstime >= curDateInt.getMilliseconds())
                {
                    volPrice = item.volume * item.price
                }
            }
        })
    
        if(preMax === 0)
            maxVol = 0
        else
        {
            maxVol = maxVol/100.00*preMax
        }
    
        const res = {
            volPercent: maxVol,
            volPrice: volPrice
        }
        
        console.log(res)

        return res
      }

    const getTotalMarketCap = () => {
        let totalMarketCap:number = 0
        alltokens.map((item, index) =>{
            totalMarketCap += getMarketCap(item.maxval, item.price, 1000)
        })

        return totalMarketCap
    }

  return (
    <><div className="w-full flex bg-slate-100 border rounded-md shadow-md mt-36 container mx-auto">
          <TotalCapView count={alltokens.length} totalMarketCap={getTotalMarketCap()} />
      </div>
      {alltokens.length !== 0 ?
        <div className='w-full grid bg-slate-100 mt-2 border rounded-xl shadow-xl container mx-auto p-3'>
            <div className="grid grid-cols-5 w-full h-12">
                <div className="text-center font-semibold pt-2 text-xl">Name</div>
                <div className="text-center font-semibold pt-2 text-xl">Price</div>
                <div className="text-center font-semibold pt-2 text-xl">24h</div>
                <div className="text-center font-semibold pt-2 text-xl">Market Cap</div>
                <div className="text-center font-semibold pt-2 text-xl">Volume24h</div>
                </div>
                {alltokens && alltokens.map((item, index) => (
                    <MapViewItem item={item} key={index} volInfo={getVolInfo(item.name)} />
                ))}
            </div>: <div className='font-bold text-center mt-8 text-md text-veryDarkBlue'> No token data... <span className='text-primaryRed'>Error</span> </div> }  
    </>
  )
}

export default Home