import axios, { AxiosError } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { orderType } from './orderSlice'
import { errorType } from '../token/tokenApis';

const wait = (ms: number) =>
    new Promise<void>((resolve) => {
        setTimeout(() => resolve(), ms);
    });

export const getOrdersAsync = createAsyncThunk("orders/getOrders", async () => {
    try{
        const res = await axios.get("http://localhost:5000/orders/all")
        
        return await res.data
    }
    catch(err) {
        console.log(err)
    }
})

export const getOrdersByNameAsync = createAsyncThunk("orders/getOrdersByName", async (name:string) => {
    try{
        const res = await axios.get(`http://localhost:5000/orders/sales/${name}`)
        
        return await res.data
    }
    catch(err) {
        console.log(err)
    }
})

export const createOrderAsync = createAsyncThunk("orders/addOrdersAsync", async (newOrder: orderType) => {
    try {
        const res = await axios.post("http://localhost:5000/orders/add", newOrder)
        
        return await res.data
    }
    catch(err) {
        if(axios.isAxiosError(err))
        {
            const error = err as AxiosError<errorType>
            if(error && error.response){
                return error.response.data
            }
            
        }
        return { errorMessage: "Error Occured!" }
    }
})