import { createSlice } from '@reduxjs/toolkit'
import { getTokensAsync, createTokenAsnc, errorType } from './tokenApis'

export type tokenType = {
    name: string,
    pid: number,
    maxval: number,
    limit: number,
    price: number
}

export type tokenState = {
    alltokens: tokenType[] | [],
    isLoading: boolean,
    error: string | null | undefined
}

const initialState: tokenState = {
    alltokens: [],
    isLoading: false,
    error: localStorage.getItem('error') ? localStorage.getItem('error')! : null
}

const tokenSlice = createSlice(
    {
        name:"token",
        initialState,
        reducers:{},
        extraReducers: (builder) => {
            builder
                .addCase(getTokensAsync.pending, (state, action) => {
                    state.isLoading = true
                })
                .addCase(getTokensAsync.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.alltokens = action.payload
                })
                .addCase(getTokensAsync.rejected, (state, action) => {
                    state.isLoading = false
                    state.error = action.error.message
                })

            builder
                .addCase(createTokenAsnc.pending, (state, action) => {
                    state.isLoading = true
                })
                .addCase(createTokenAsnc.fulfilled, (state, action) => {
                    state.isLoading = false
                    const payload = action.payload
                    if(payload.error)
                    {
                        state.error = payload.error
                        localStorage.setItem('error', payload.error)
                    }
                    else{
                        state.error =null
                        localStorage.setItem('error', '')
                        state.alltokens = payload
                    }
                })
                .addCase(createTokenAsnc.rejected, (state, action) => {
                    state.isLoading = false
                    state.error = action.error.message
                    console.log("In rejected")
                    console.log(state.error)
                })
        }
    }
)

export default tokenSlice.reducer