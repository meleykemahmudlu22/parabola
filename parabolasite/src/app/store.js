import { configureStore } from '@reduxjs/toolkit'
import registerSlice from "../features/Register/RegisterSlice"
export const  store=configureStore({
    reducer:{register:registerSlice}
})