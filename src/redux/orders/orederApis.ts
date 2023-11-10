import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { orderType } from './orderSlice'

export const getOrdersAsync = createAsyncThunk("getOrders", async () => {
    try{
        const res = await axios.get("http://localhost:5000/orders/all")
        
        return res.data
    }
    catch(err) {
        console.log(err)
    }
})

export const createOrderAsync = createAsyncThunk("addOrdersAsync", async (newOrder: orderType) => {
    try {
        console.log(newOrder)
        const res = await axios.post("http://localhost:5000/orders/add", newOrder)
        console.log(res.data)

        return res.data
    }
    catch(err) {
        console.log(err)
    }
})