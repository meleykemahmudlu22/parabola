import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "authlogin",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null, 
    loading: false,
    error: null
  },
  reducers: {
    loginStart: (state) => { state.loading = true },
    loginSucces: (state, action) => {
      state.loading = false
      state.user = action.payload
      localStorage.setItem("user", JSON.stringify(action.payload)) 
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      localStorage.removeItem("user")
    }
  }
})

export const { loginStart, loginSucces, loginFailure, logout } = loginSlice.actions
export default loginSlice.reducer
