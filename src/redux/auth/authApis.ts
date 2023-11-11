import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { userType } from './authSlice'

export const loginUserAsync = createAsyncThunk("auth/loginUser", async (newUser: userType) => {
    try{
        console.log("In loginUserSync!")
        const res = await axios.post("http://localhost:5000/auth/login", newUser)
        console.log(res.status)
        return res.data
    }
    catch(err) {
        console.log(err)
    }
})

export const registerUserAsync = createAsyncThunk("auth/registerUser", async (newUser: userType) => {
    try {
        const res = await axios.post("http://localhost:5000/auth/register", newUser)
        
        return res.data
    }
    catch(err) {
        console.log(err)
    }
})
