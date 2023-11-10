import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import type { TypedUseSelectorHook } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import tokenReducer from './token/tokenSlice'
import orderReducer from './orders/orderSlice'

export const store = configureStore({
        reducer: {
            token: tokenReducer,
            order: orderReducer
        }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch