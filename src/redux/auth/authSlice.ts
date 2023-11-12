import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { registerUserAsync, loginUserAsync } from './authApis'

export type userType = {
    username: string,
    password: string,
}

export type userState = {
    user: userType | undefined,
    error: null | string | undefined,
    isLoading: boolean
}

const initialState: userState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : undefined,
    error: null,
    isLoading: false
}

const userSlice = createSlice(
    {
        name:"auth",
        initialState,
        reducers:{
            logOut: (state, action: PayloadAction<void, string>) => {
                localStorage.removeItem('user')
                state.user = undefined
            }
        },
        extraReducers: (builder) => {
                builder
                .addCase(registerUserAsync.pending, (state, action) => {
                    state.isLoading = true
                })
                .addCase(registerUserAsync.fulfilled, (state, action) => {
                    state.isLoading = true,
                    state.user = action.payload
                })
                .addCase(registerUserAsync.rejected, (state, action) => {
                    state.isLoading = true,
                    state.error = action.error.message
                })

                builder
                .addCase(loginUserAsync.pending, (state, action) => {
                    state.isLoading = true
                })
                .addCase(loginUserAsync.fulfilled, (state, action) => {
                    state.isLoading = true
                    const tuser:userType = action.payload
                    if(tuser && tuser.password.length !== 0)
                    {
                        localStorage.setItem('user', JSON.stringify(tuser))
                        state.user = action.payload
                    }
                })
                .addCase(loginUserAsync.rejected, (state, action) => {
                    state.isLoading = true,
                    state.error = action.error.message
                })
        }
    }
)

export const { logOut } = userSlice.actions
export default userSlice.reducer