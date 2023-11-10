import { createSlice } from '@reduxjs/toolkit'
import { getTokensAsync, createTokenAsnc } from './tokenApis'

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
    error: null | string | undefined
}

const initialState: tokenState = {
    alltokens: [],
    isLoading: false,
    error: null
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
                    state.isLoading = true,
                    state.alltokens = action.payload
                })
                .addCase(getTokensAsync.rejected, (state, action) => {
                    state.isLoading = true,
                    state.error = action.error.message
                })

            builder
                .addCase(createTokenAsnc.pending, (state, action) => {
                    state.isLoading = true
                })
                .addCase(createTokenAsnc.fulfilled, (state, action) => {
                    state.isLoading = true,
                    state.alltokens = action.payload
                })
                .addCase(createTokenAsnc.rejected, (state, action) => {
                    state.isLoading = true,
                    state.error = action.error.message
                })
        }
    }
)

export default tokenSlice.reducer