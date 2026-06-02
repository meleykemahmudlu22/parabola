import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null, 
    loading: false,
    error: null
  },
  reducers: {
    registerStart: (state) => { state.loading = true },
    registerSucces: (state, action) => {
      state.loading = false
      state.user = action.payload
      localStorage.setItem("user", JSON.stringify(action.payload)) 
    },
    registerFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      localStorage.removeItem("user")
    }
  }
})

export const { registerStart, registerSucces, registerFailure, logout } = registerSlice.actions
export default registerSlice.reducer
