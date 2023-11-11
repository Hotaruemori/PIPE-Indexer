import { createSlice } from '@reduxjs/toolkit'
import { getOrdersAsync, createOrderAsync, getOrdersByNameAsync } from './orederApis'

export type orderType = {
    name: string,
    volume: number,
    price: number,
    orderstime: number,
}

export type volInfoType = {
    volPercent:number,
    volPrice: number
}

export type orderState = {
    allOrders: orderType[] | [],
    isLoading: boolean,
    error: null | string | undefined
}

const initialState: orderState = {
    allOrders: [],
    isLoading: false,
    error: null
}

const ordersSlice = createSlice(
    {
        name:"order",
        initialState,
        reducers:{},
        extraReducers: (builder) => {
            builder
                .addCase(getOrdersAsync.pending, (state, action) => {
                    state.isLoading = true
                })
                .addCase(getOrdersAsync.fulfilled, (state, action) => {
                    state.isLoading = true
                    state.allOrders = action.payload
                })
                .addCase(getOrdersAsync.rejected, (state, action) => {
                    state.isLoading = true
                    state.error = action.error.message
                })

            builder
                .addCase(createOrderAsync.pending, (state, action) => {
                    state.isLoading = true
                })
                .addCase(createOrderAsync.fulfilled, (state, action) => {
                    state.isLoading = true
                    const payload = action.payload

                    if(payload.error)
                    {
                        state.error = payload.error
                        localStorage.setItem('error', payload.error)
                    }
                    else{
                        state.error =null
                        localStorage.setItem('error', '')
                        state.allOrders = payload
                    }
                })
                .addCase(createOrderAsync.rejected, (state, action) => {
                    state.isLoading = true
                    state.error = action.error.message
                })
        }
    }
)

export default ordersSlice.reducer