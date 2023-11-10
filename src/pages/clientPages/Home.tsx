import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import { getTokensAsync } from '../../redux/token/tokenApis'

import TotalCapView from '../../components/tokenViews/TotalCapView';
import MapViewItem from '../../components/tokenViews/MapViewItem';
import { getMarketCap } from '../../utils/getMarketCap';


const Home = () => {
    const alltokens = useSelector((state:RootState) => state.token.alltokens)
    const dispatch:AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(getTokensAsync())

    }, [dispatch])
    
    const getTotalMarketCap = () => {
        let totalMarketCap:number = 0
        alltokens.map((item, index) =>{
            totalMarketCap += getMarketCap(item.maxval, item.price, 1000)
            console.log(totalMarketCap)
        })

        return totalMarketCap
    }

  return (
    <><div className="w-full flex bg-slate-100 border rounded-md shadow-md mt-36 container mx-auto">
          <TotalCapView count={alltokens.length} totalMarketCap={getTotalMarketCap()} />
      </div>
      {alltokens.length !== 0 ?
        <div className='w-full grid bg-slate-100 mt-2 border rounded-xl shadow-xl container mx-auto p-3'>
            <div className="grid grid-cols-3 w-full h-12">
                <div className="text-center font-semibold pt-2 text-xl">Name</div>
                <div className="text-center font-semibold pt-2 text-xl">Price</div>
                <div className="text-center font-semibold pt-2 text-xl">Market Cap</div>
                </div>
                {alltokens && alltokens.map((item, index) => (
                    <MapViewItem item={item} key={index} />
                ))}
            </div>: <div className='font-bold text-center mt-8 text-md text-veryDarkBlue'> No token data... <span className='text-primaryRed'>Error</span> </div> }  
    </>
  )
}

export default Home