import { createSlice } from "@reduxjs/toolkit";

const registerSlice=createSlice({
    name:"auth",
    initialState:{
        user:null,
        loading:false,
        error:null
    },
    reducers:{
        registerStart:(state)=>{state.loading=true},
        registerSucces:(state,action)=>{
            state.loading=false
            state.user= action.payload
        },
        registerFailure:(state,action)=>{
            state.loading=false
            state.error=action.payload
        }
    }
})
export const{registerStart,registerSucces,registerFailure}=registerSlice.actions
export default registerSlice.reducer