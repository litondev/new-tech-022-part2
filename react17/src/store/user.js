import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value : null,
  },
  reducers: {
    setUser: (state,action) => {    
      state.value = action.payload;
    },
    getUser: (state) => {
      return state.value;
    }
  },
})

export const { setUser,getUser } = userSlice.actions

export default userSlice.reducer