import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import { getTokensAsync } from '../../redux/token/tokenApis'


function RecentOrders() {

  return (
    <div className="w-full flex bg-slate-100 border rounded-md shadow-md mt-36 container mx-auto">
          <h1 className="text-3xl mt-3">This is Recent Orders!</h1>
      </div>
      
  )
}


export default RecentOrders;