import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { tokenType } from './tokenSlice'

export const getTokensAsync = createAsyncThunk("getAllTokens", async () => {
    try{
        const res = await axios.get("http://localhost:5000/api/")
        
        return res.data
    }
    catch(err) {
        console.log(err)
    }
})

export const createTokenAsnc = createAsyncThunk("addTokenAsync", async (newToken: tokenType) => {
    try {
        console.log(newToken)
        const res = await axios.post("http://localhost:5000/api/addtoken", newToken)
        console.log(res.data)

        return res.data
    }
    catch(err) {
        console.log(err)
    }
})