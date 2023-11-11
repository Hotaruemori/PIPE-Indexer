import axios, { AxiosError } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { tokenType } from './tokenSlice'

export const getTokensAsync = createAsyncThunk("getAllTokens", async () => {
    try{
        const res = await axios.get("http://localhost:5000/api/")
        
        return await res.data
    }
    catch(err) {
        throw new Error("Something went wrong!")
    }
})

export type errorType = {
    errorMessage:string
}

export const createTokenAsnc = createAsyncThunk("addTokenAsync", async (newToken: tokenType) => {
    try {
        const res = await axios.post("http://localhost:5000/api/addtoken", newToken)
        
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