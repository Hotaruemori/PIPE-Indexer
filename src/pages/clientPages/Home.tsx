import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import { getTokensAsync } from '../../redux/token/tokenApis'

import TotalCapView from '../../components/tokenViews/TotalCapView';
import MapViewItem from '../../components/tokenViews/MapViewItem';
import { getMarketCap } from '../../utils/getMarketCap';
import { getOrdersAsync } from '../../redux/orders/orederApis';
import classnames from 'classnames';



const Home = () => {
    const alltokens = useSelector((state:RootState) => state.token.alltokens)
    const allOrders = useSelector((state:RootState) => state.order.allOrders)
    const dispatch:AppDispatch = useDispatch()
    
    const [curIndex, setCurIndex ] = useState(1)
    const pageshow:number = 10

    useEffect(() => {
        dispatch(getTokensAsync())
        dispatch(getOrdersAsync())
    }, [dispatch])
    
    const isLeapYear = (year:number) =>{
        return (year%400 === 0 || year % 4 === 0 && year % 100 !== 0)
    }

    const getPrevDate = (year:number, month: number, day:number) =>
    {
        let tm = month
        let ty = year
        let td = day
        let dayofmonth:number[] = [0, 31,28,31,30,31,30,31,31,30,31,30,31]
        if(isLeapYear(year))
            dayofmonth[2] += 1

        if(td === 1)
        {
            if(tm === 1)
            {
                ty--
                tm = 12
                td = 31
            }
            else
            {
                tm--
                td = dayofmonth[tm]
            }
        }
        else
        {
            td--
        }

        const  res = new Date(tm, ty, td, 0, 0, 0)
        return res
    }

    const getVolInfo = (name:string) => {
        let vol24h:number = 0
        let prevol24h:number = 0
        let vol24hCount:number = 0
        let saledVol:number = 0
        let recentPrice:number = 0
        let dateMax:number = 0
        let curDateInt:number = Date.now()
        let prevDateInt:number = curDateInt - 24*60*60*1000
        const hour24ms = 24 * 60 * 60 * 1000
        console.log(curDateInt, prevDateInt)

        allOrders.map((item, index) => {
            if(item.name === name)
            {           
                if(item.orderstime > dateMax)
                {
                    recentPrice = item.price / item.volume
                    dateMax = item.orderstime
                }

                saledVol += item.volume
                if((item.orderstime >= (prevDateInt)) && (item.orderstime <= curDateInt))
                {
                    vol24h += item.price
                    vol24hCount += item.volume
                    
                }
                else if((item.orderstime <= (prevDateInt)) && (item.orderstime >= (prevDateInt - hour24ms)))
                {
                    prevol24h += item.price
                }
            }
        })
        console.log(vol24h, prevol24h)
            
        const res = {
            volPercent: prevol24h === 0 ? 0 : ((vol24h - prevol24h) / (prevol24h / 100.00)),
            volPrice: vol24hCount, //24h volcount
            recentSaleCount: saledVol, //all salecount
            recentPrice: recentPrice
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
    const handlePreviousClick = () =>
    {
        if(curIndex > 1)
            setCurIndex(curIndex-1)
    }

    const handleNextClick = () =>
    {

        if(curIndex < (alltokens.length / pageshow))
            setCurIndex(curIndex+1)

    }

    

  return (
    <div className="dark:bg-slate-700">
        <div className="mt-28 pt-8">
            <div className="w-full flex bg-slate-100 dark:bg-slate-800 rounded-xl shadow-lg dark:text-gray-300 dark:shadow-slate-500 container mx-auto">
                <TotalCapView count={alltokens.length} totalMarketCap={getTotalMarketCap()} />
            </div>
        </div>
      {alltokens.length !== 0 ?
        <div className='w-full grid bg-slate-100 dark:bg-slate-800 dark:text-gray-300 mt-4 rounded-xl shadow-xl dark:shadow-slate-500 container mx-auto p-3'>
            <div className="grid grid-cols-5 w-full h-12 mt-2 mb-2 pr-5">
                    <div className="col-end-6 col-span-1 text-right">
                        <span className="mr-3 text-lg">Page {curIndex} of {Math.round(alltokens.length / pageshow)}</span>
                        <button onClick={e => handlePreviousClick()} className="w-12 h-12 mr-2 text-blue-900 dark:text-white font-semibold text-xl rounded-lg shadow-sm shadow-blue-400 bg-white dark:bg-blue-950">{"<"}</button>
                        <button onClick={e=> handleNextClick()} className="w-12 h-12 mr-2 bg-white dark:bg-blue-950 text-blue-900 dark:text-white font-semibold text-xl rounded-lg shadow-sm shadow-blue-400">{">"}</button>
                    </div>
                </div>
            <div className="grid grid-cols-5 w-full h-12">
                <div className="text-center font-semibold pt-2 text-xl">Name</div>
                <div className="text-center font-semibold pt-2 text-xl">Price</div>
                <div className="text-center font-semibold pt-2 text-xl">24h</div>
                <div className="text-center font-semibold pt-2 text-xl">Market Cap</div>
                <div className="text-center font-semibold pt-2 text-xl">Volume24h</div>
                </div>
                {alltokens && alltokens.map((item, index) => {
                    if((index >= (curIndex-1)* pageshow ) && (index < curIndex*pageshow))
                        return (<MapViewItem item={item} key={index} volInfo={getVolInfo(item.name)} />)
                })}
                
            </div>: <div className='font-bold text-center mt-8 text-md text-veryDarkBlue'> No token data... <span className='text-primaryRed'>Error</span> </div> }  
   </div>
  )
}

export default Home