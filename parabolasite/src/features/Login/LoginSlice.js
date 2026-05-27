import { createSlice } from "@reduxjs/toolkit";

const loginSlice=createSlice({
    name:"authlogin",
    initialState:{
        user:null,
        loading:false,
        error:null
    },
    reducers:{
        loginStart:(state)=>{state.loading=true},
            loginSucces:(state,action)=>{
             state.loading=false
             state.user=action.payload
            },
             loginFailure:(state,action)=>{
            state.loading=false
            state.error=action.payload
        }
        
       
    }

})
export const{loginStart,loginSucces,loginFailure}=loginSlice.actions
export default loginSlice.reducer