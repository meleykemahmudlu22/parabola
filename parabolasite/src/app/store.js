import { configureStore } from '@reduxjs/toolkit'
import registerSlice from "../features/Register/RegisterSlice"
import loginSlice from "../features/Login/LoginSlice"
import profileSlice from "../features/Profile/ProfileSlice"
export const  store=configureStore({
    reducer:{
        auth:registerSlice,
        authlogin:loginSlice,
        profile:profileSlice
    }
})