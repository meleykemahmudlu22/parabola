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
        rehisterFailure:(state,action)=>{
            state.loading=false
            state.user=action.payload
        }
    }
})
export const{registerStart,registerSucces,rehisterFailure}=registerSlice.actions
export default registerSlice.reducer